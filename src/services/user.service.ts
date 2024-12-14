import { createError } from '../hooks';
import { User as UserModel } from '../models';
import { BAD_REQUEST } from '../types/errors.type';
import { getUserQuery_I, updateUser_I } from '../types/user.type';

export const UserService = {
  findAllUsers: async (query: getUserQuery_I) => {
    const { page = 1, limit = 10, search, status, type } = query;
    // Build the search query
    const filter: any = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive on firstName
        { email: { $regex: search, $options: 'i' } }, // Case-insensitive on email
      ];
    }

    if (status) {
      filter.status = status; // Add status filter if provided
    }

    if (type) {
      filter.type = type; // Add type filter if provided
    }

    const skip = (page - 1) * limit;

    // Fetch paginated users
    const users = await UserModel.find(filter).skip(skip).limit(limit);

    // Get total count for pagination metadata
    const totalCount = await UserModel.countDocuments(filter);

    return {
      users,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  },

  updateUserById: async (userId: string, data: updateUser_I) => {
    // Ensure the userId is provided
    if (!userId) {
      throw createError(
        BAD_REQUEST.name,
        BAD_REQUEST.status,
        BAD_REQUEST.message
      );
    }

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      throw createError(BAD_REQUEST.name, BAD_REQUEST.status, 'User not found');
    }

    // Find and update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: data }, // Perform a partial update using $set
      { new: true, runValidators: true } // Return the updated document and apply validation
    );

    return updatedUser;
  },
};
