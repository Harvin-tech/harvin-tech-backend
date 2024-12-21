import mongoose from 'mongoose';
import { createError } from '../hooks';
import { Chapter, Course, Lesson } from '../models';
import { createCourse_I, getCourse_I } from '../types/course.type';
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
      const course = await Course.create(
        [{ ...restBody, ctfg: 1, status: 1 }],
        {
          session,
        }
      );

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

  static async getCourseById(courseId: string) {
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
            description: 1,
            price: 1,
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
}
