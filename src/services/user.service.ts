import { userModel } from "../database/models/User.model";
import { User } from "../types/global";

export class UserService {
  static async getAllUsers() {
    try {
      const users = await userModel.find();
      return users; 
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  static async getUserByID(id: string) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error(`Error fetching the user with id ${id}:`, error);
      throw new Error("Failed to get the user");
    }
  }

  static async UpdateUser(id: string, data: Partial<User>) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, data);
      if (!updatedUser) {
        return null;
      }
      return updatedUser;
    } catch (error) {
      console.error("Failed to update the user:", error);
      throw new Error("Failed to update user");
    }
  }

  static async DeleteUser(id: string) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(id); 
      return !!deletedUser; 
    } catch (error) {
      console.error("Failed to delete the user:", error);
      throw new Error("Failed to delete user");
    }
  }
}

