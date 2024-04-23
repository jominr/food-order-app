import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  // 1. check if the user exists
  // 2. create the user if it doesn't exist 
  // 3. return the user object to the calling client
  try {
    // 记录数据库的方法：查找一条： User.findOne()
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      // 注意这里return, 下文不return
      return res.status(200).send();
    }
    // 记录数据库的方法：新增一条：new and save()
    const newUser = new User(req.body);
    await newUser.save();
    // 201 means created. and then pass back the new user
    res.status(201).json(newUser.toObject());
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
  
}

export default {
  createCurrentUser
}