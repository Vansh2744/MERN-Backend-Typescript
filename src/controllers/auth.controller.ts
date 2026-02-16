import type { Request, Response } from "express";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export const SignUp = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      ...req.body,
    });

    if (!user) {
      return res.status(500).json({
        message: "Unable to create user",
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "User created",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Unable to create user",
      error,
    });
  }
};
