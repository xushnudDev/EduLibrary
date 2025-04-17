import { hash, compare } from "bcrypt";
import userModel from "./models/user.model.js";
import { isValidObjectId } from "mongoose";

class UserService {
  #_userModel;
  constructor() {
    this.#_userModel = userModel;
  }

  getAllUsers = async () => {
    const users = await this.#_userModel.find();

    if (!users) {
      throw new Error("Users not found");
    }
    return {
      message: "success",
      count: users.length,
      data: users,
    };
  };

  getUserById = async (id) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid user id");
    }
    const user = await this.#_userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      message: "success",
      data: user,
    };
  };

  registerUser = async ({ fullname, email, password,phoneNumber,role,age }) => {
    const existingUser = await this.#_userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await hash(password, 10);

    const newUser = await this.#_userModel.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      age,
    });
    return {
      message: "success",
      data: newUser,
    };
  };

  loginUser = async ({ email, password }) => {
    const user = await this.#_userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return {
      message: "success",
      data: user,
    };
  };
  updateUser = async (id, { fullname, email, password,phoneNumber,role,age }) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid user id");
    }

    const hashedPassword = await hash(password, 10);

    const updatedUser = await this.#_userModel.findByIdAndUpdate(
      id,
      {
        fullname,
        email,
        password: hashedPassword,
        phoneNumber,
        role,
        age,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return {
      message: "success",
      data: updatedUser,
    };
  };

  deleteUser = async (id) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid user id");
    }
    const user = await this.#_userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.#_userModel.findByIdAndDelete(id);
    return;
  };
}
export default new UserService();
