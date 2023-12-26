import * as User from "../models/userModel";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

const RegisterSchema = z.object({
  username: z.string().min(5, "Username should be more than 5 characters"),
  email: z.string().email().min(5, "Email should be more than 5 characters"),
  password: z.string().min(8, "Password should be more than 8 characters"),
});

// Assuming you have a 'usersModel' module
import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export const getAllUsers = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.getUserById(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const newUser = req.body;
    const createdUser = await User.createUser(newUser);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.updateUserById(userId, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await User.deleteUserById(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// export const registerUser = async (
//   req: ExpressRequest,
//   res: ExpressResponse,
//   next: NextFunction
// ) => {
//   try {
//     const { username, email, password } = req.body;

//     // Create a query object based on the received username or email
//     const query = username ? { username } : { email };

//     // Check if user already exists
//     const existingUser = await User.getUserByUsernameOrEmail(query);
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Save the new user
//     const newUser = { ...req.body, password: hashedPassword };
//     const savedUser = await User.createUser(newUser);

//     res.json(savedUser);
//   } catch (error) {
//     next(error);
//   }
// };

export const registerUser = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // Validate the inputs
    const result = RegisterSchema.safeParse(req.body);
    console.log("🚀 ~ file: userController.ts:128 ~ result:", result);
    if (result.success === false) {
      return res.status(400).json(result.error.issues);
    }

    // Create a query object based on the received username or email
    const query = username ? { username } : { email };

    // Check if user already exists
    // Check if username already exists
    const existingUsername = await User.getExistingUser({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.getExistingUser({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = { ...req.body, password: hashedPassword };
    const savedUser = await User.createUser(newUser);

    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const query = username ? { username } : { email };

    const user = await User.getExistingUser(query);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
