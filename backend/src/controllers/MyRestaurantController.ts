import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    res.json(restaurant)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching restaurant" })
  }
}

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // 数据库操作 find && findOne
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      // 409 means duplicate, there is a record existing already.
      // 这里规定了一个用户只能有一家店铺
      return res.status(409).json({ message: "User restaurant already exists"});
    }

    // get the image, 这是中间件处理出来的 
    const image  = req.file as Express.Multer.File;
    // bese64 string
    const base64Image = Buffer.from(image.buffer).toString("base64");
    // mimetype: jpeg, png, ...
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    // image api response
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    // 数据库操作: new
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    // link the user to this restaurant record
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    // 数据库操作: save to the database 
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    
    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wen wrong"});
  }
}

export default {
  createMyRestaurant,
  getMyRestaurant
};