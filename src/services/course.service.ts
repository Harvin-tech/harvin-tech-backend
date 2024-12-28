import mongoose from 'mongoose';
import { createError } from '../hooks';
import { Chapter, Course, Enrollment, Lesson, User } from '../models';
import {
  createCourse_I,
  enrollCourse_I,
  getCourse_I,
  getEnrolledCoursesQuery_I,
} from '../types/course.type';
import { BAD_REQUEST } from '../types/errors.type';

export class CourseService {
  static async createCourse(body: createCourse_I) {
    const { chapters, ...restBody } = body;

    const isCourseExist = await Course.findOne({ title: restBody.title });
    if (isCourseExist) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Course with the same title already exists'
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const course = await Course.create([{ ...restBody }], {
        session,
      });

      console.log('course--->', course);
      const courseId = course[0]._id;

      const chapterBulkOps: mongoose.AnyBulkWriteOperation[] = [];
      const lessonBulkOps: mongoose.AnyBulkWriteOperation[] = [];

      if (!chapters) {
        throw createError(
          BAD_REQUEST.name,
          BAD_REQUEST.status,
          'At least one Chapters are required'
        );
      }

      for (const chapter of chapters) {
        const chapterId = new mongoose.Types.ObjectId();

        chapterBulkOps.push({
          insertOne: {
            document: {
              _id: chapterId,
              courseId,
              title: chapter.title,
              description: chapter.description,
            },
          },
        });

        if (!chapter.lessons) {
          throw createError(
            BAD_REQUEST.name,
            BAD_REQUEST.status,
            'At least one Lessons are required'
          );
        }

        for (const lesson of chapter.lessons) {
          lessonBulkOps.push({
            insertOne: {
              document: {
                chapterId,
                ...lesson,
              },
            },
          });
        }
      }

      if (chapterBulkOps.length) {
        await Chapter.bulkWrite(chapterBulkOps, { session });
      }
      if (lessonBulkOps.length) {
        await Lesson.bulkWrite(lessonBulkOps, { session });
      }

      await session.commitTransaction();
      session.endSession();

      return course;
    } catch (error) {
      console.error('ERROR_CREATE_COURSE', error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  static async getAllCourse(query: getCourse_I) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      category,
      minPrice,
      maxPrice,
      level,
    } = query;

    let filter: any = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // Case-insensitive on title
    }

    if (status) {
      filter.status = status; // Add status filter if provided
    }

    if (category) {
      filter.category = category; // Add category filter if provided
    }

    if (minPrice || maxPrice) {
      const mp = minPrice || 0;
      const mxp = maxPrice || Infinity;
      filter.price = { $gte: mp, $lte: mxp };
    }

    const skip = (page - 1) * limit;

    if (level) {
      filter.level = level; // Add level filter if provided
    }

    const [courses, total] = await Promise.all([
      Course.find(filter).skip(skip).limit(limit),
      Course.countDocuments(filter),
    ]);

    const result = {
      course: courses || [],
      total,
      maxPages: Math.ceil(total / limit),
    };

    return result;
  }

  static async updateCourseById(courseId: string, requestBody: any) {
    const { title } = requestBody;
    // Find the course by ID and update it
    const isCourseExist = await Course.findOne({ _id: courseId });

    if (!isCourseExist) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Course not found'
      );
    }

    if (title) {
      const isTitleExist = await Course.findOne({ title });

      if (isTitleExist) {
        throw createError(
          BAD_REQUEST.name,
          BAD_REQUEST.status,
          'Title already exists'
        );
      }
    }

    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $set: requestBody },
      { new: true }
    );

    if (!course) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Failed to update course'
      );
    }

    return { course: course['_doc'] };
  }

  static async getCourseById(courseId: string, status: number) {
    try {
      // Validate courseId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw createError(
          BAD_REQUEST.name,
          BAD_REQUEST.status,
          'Invalid course ID'
        );
      }

      // Aggregation pipeline to fetch the course, its chapters, and lessons
      const pipeline = [
        // Step 1: Match the course by ID
        {
          $match: {
            _id: new mongoose.Types.ObjectId(courseId),
            ...(status ? { status } : {}),
          },
        },
        // Step 2: Lookup to join Chapters with the Course
        {
          $lookup: {
            from: 'chapters',
            localField: '_id',
            foreignField: 'courseId',
            as: 'chapters',
          },
        },

        // Step 3: Project the desired output format
        {
          $project: {
            title: 1,
            description: 1,
            price: 1,
            category: 1,
            status: 1,
            // chapters: {
            //   $filter: {
            //     input: '$chapters', // The chapters array
            //     as: 'chapter', // Temporary variable name for each chapter
            //     cond: { $eq: ['$$chapter.status', 1] }, // Condition: status must be 1
            //   },
            // },
            chapters: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ];

      const courseData = await Course.aggregate(pipeline);

      return courseData[0];
    } catch (error) {
      console.error('Error fetching course data:', error);
      throw error;
    }
  }

  static async getChapterById(chapterId: string, status: number) {
    try {
      // Validate chapterId
      if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        throw createError(
          BAD_REQUEST.name,
          BAD_REQUEST.status,
          'Invalid chapter ID'
        );
      }

      // Aggregation pipeline to fetch the chapter and its lessons
      const pipeline = [
        // Step 1: Match the chapter by ID
        {
          $match: {
            _id: new mongoose.Types.ObjectId(chapterId),
            ...(status ? { status } : {}),
          },
        },
        // Step 2: Lookup to join Lessons with the Chapter
        {
          $lookup: {
            from: 'lessons',
            localField: '_id',
            foreignField: 'chapterId',
            as: 'lessons',
          },
        },
        // Step 3: Project the desired output format
        {
          $project: {
            title: 1,
            description: 1,
            status: 1,
            lessons: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ];

      const chapterData = await Chapter.aggregate(pipeline);

      return chapterData[0];
    } catch (error) {
      console.error('Error fetching chapter data:', error);
      throw error;
    }
  }

  static async getCourseAllDetailsById(courseId: string) {
    try {
      // Validate courseId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw createError(
          BAD_REQUEST.name,
          BAD_REQUEST.status,
          'Invalid course ID'
        );
      }

      // Aggregation pipeline to fetch the course, its chapters, and lessons
      const pipeline = [
        // Step 1: Match the course by ID
        {
          $match: { _id: new mongoose.Types.ObjectId(courseId) },
        },
        // Step 2: Lookup to join Chapters with the Course
        {
          $lookup: {
            from: 'chapters',
            localField: '_id',
            foreignField: 'courseId',
            as: 'chapters',
          },
        },
        // Step 3: Lookup to join Lessons with the Chapters
        {
          $unwind: '$chapters', // Unwind the chapters array to ensure we can process each chapter individually
        },
        {
          $lookup: {
            from: 'lessons',
            localField: 'chapters._id',
            foreignField: 'chapterId',
            as: 'chapters.lessons', // Store the lessons under the 'lessons' field in each chapter
          },
        },
        // Step 4: Rebuild the chapters array after unwinding
        {
          $group: {
            _id: '$_id', // Group by course _id
            title: { $first: '$title' },
            description: { $first: '$description' },
            price: { $first: '$price' },
            category: { $first: '$category' },
            status: { $first: '$status' },
            chapters: { $push: '$chapters' }, // Push all chapters (including lessons) back into the chapters array
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        // Step 5: Project the desired output format
        {
          $project: {
            title: 1,
            subTitle: 1,
            instructure: 1,
            description: 1,
            price: 1,
            mrp: 1,
            category: 1,
            status: 1,
            chapters: {
              title: 1,
              description: 1,
              status: 1,
              lessons: 1,
            },
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ];

      const courseData = await Course.aggregate(pipeline);

      return courseData[0];
    } catch (error) {
      console.error('Error fetching course data:', error);
      throw error;
    }
  }

  static async enrollCourse(body: enrollCourse_I) {
    const { courseId, userId } = body;

    const isCourseExist = await Course.findOne({ _id: courseId });
    if (!isCourseExist) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'Course not found'
      );
    }

    const isUserExist = await User.findOne({ _id: userId });
    if (!isUserExist) {
      throw createError(BAD_REQUEST.name, BAD_REQUEST.status, 'User not found');
    }

    const isAlreadyEnrolled = await Enrollment.findOne({
      courseId,
      userId,
      status: 1,
    });

    if (isAlreadyEnrolled) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        'User already enrolled in this course'
      );
    }

    const data = await Enrollment.create([{ courseId, userId }]);

    return data;
  }

  static async getEnrolledAllCourse(query: getCourse_I) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      category,
      minPrice,
      maxPrice,
      level,
    } = query;

    const skip = (page - 1) * limit;

    // Build the filter object
    const filter: any = {};

    if (search) {
      filter.$or = [
        { 'userDetails.firstName': { $regex: search, $options: 'i' } }, // Search in user name
        { 'courseDetails.title': { $regex: search, $options: 'i' } }, // Search in course title
      ];
    }

    if (status) {
      filter['status'] = status; // Filter by enrollment status
    }

    if (category) {
      filter['courseDetails.category'] = category; // Filter by course category
    }

    if (minPrice || maxPrice) {
      const min = minPrice || 0;
      const max = maxPrice || Infinity;
      filter['courseDetails.price'] = { $gte: min, $lte: max }; // Filter by course price
    }

    if (level) {
      filter['courseDetails.level'] = level; // Filter by course level
    }

    const pipeline = [
      // Step 1: Lookup users to get user details
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      // Step 2: Lookup courses to get course details
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'courseDetails',
        },
      },
      // Step 3: Unwind userDetails and courseDetails to access individual objects
      { $unwind: '$userDetails' },
      { $unwind: '$courseDetails' },
      // Step 4: Apply the filters using $match
      { $match: filter },
      // Step 5: Use $facet for pagination and count in a single pipeline
      {
        $facet: {
          // Fetch the paginated results
          data: [
            { $skip: skip }, // Skip documents for the current page
            { $limit: limit }, // Limit the number of documents per page
            {
              $project: {
                _id: 0, // Exclude enrollment document ID
                userId: 1,
                courseId: 1,
                overAllProgress: 1,
                enrolledAt: 1,
                user: {
                  id: '$userDetails._id',
                  name: '$userDetails.firstName',
                  email: '$userDetails.email',
                },
                course: {
                  id: '$courseDetails._id',
                  title: '$courseDetails.title',
                  description: '$courseDetails.description',
                  price: '$courseDetails.price',
                  category: '$courseDetails.category',
                  level: '$courseDetails.level',
                },
              },
            },
          ],
          // Get the total count of matching documents
          totalCount: [{ $count: 'total' }],
        },
      },
    ];

    // Execute the pipeline
    const result = await Enrollment.aggregate(pipeline);

    console.log('result', JSON.stringify(result, null, 2));

    // Extract the results
    const enrollments = result[0]?.data || [];
    const totalCount = result[0]?.totalCount[0]?.total || 0;

    const res = {
      data: enrollments,
      total: totalCount,
      maxPages: Math.ceil(totalCount / limit),
    };

    // Return the response
    return res;
  }

  static async getEnrolledCoursesOfUser(
    userId: string,
    query: getEnrolledCoursesQuery_I
  ) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const pipeline = [
      // Step 1: Match enrollments for the specific user
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      // Step 2: Lookup to join Courses collection
      {
        $lookup: {
          from: 'courses', // Name of the courses collection
          localField: 'courseId', // Field in enrollment collection
          foreignField: '_id', // Field in courses collection
          as: 'courseDetails', // The result will be stored in this field
        },
      },
      // Step 3: Unwind the courseDetails array to access individual course objects
      {
        $unwind: '$courseDetails',
      },
      // Step 4: Filter courses by title (case-insensitive search)
      {
        $match: {
          'courseDetails.title': {
            $regex: search ?? '',
            $options: 'i', // Case-insensitive search
          },
        },
      },
      // Step 5: Use $facet to combine results and total count
      {
        $facet: {
          data: [
            { $skip: skip }, // Skip documents for the current page
            { $limit: limit }, // Limit the number of documents per page
            {
              $project: {
                _id: 0, // Exclude enrollment document's _id
                courseId: '$courseId',
                userId: '$userId',
                overAllProgress: 1,
                enrolledAt: 1,
                startedAt: 1,
                lastAccessedAt: 1,
                expiredAt: 1,
                amountPaid: 1,
                status: 1,
                'courseDetails.title': 1,
                'courseDetails.subTitle': 1,
                'courseDetails.mrp': 1,
                'courseDetails.instructor': 1,
                'courseDetails.status': 1,
                'courseDetails.description': 1,
                'courseDetails.image': 1,
                'courseDetails.price': 1,
                'courseDetails.category': 1,
                'courseDetails.level': 1,
              },
            },
          ],
          totalCount: [
            { $count: 'count' }, // Count the total number of matching documents
          ],
        },
      },
    ];

    const result = await Enrollment.aggregate(pipeline);

    // Extract data and total count
    const enrolledCourses = result[0]?.data || [];
    const totalCount = result[0]?.totalCount[0]?.count || 0;

    const res = {
      courses: enrolledCourses,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    };

    return res;
  }
}
