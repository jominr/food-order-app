import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
// cloudinary package exports a V2 variable which is the version 2 of their API, 

// typescript : as string
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=> console.log("Connected to database!"))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app = express();

// add the middleware: convert the req.body to json
app.use(express.json()); 
app.use(cors());

app.get("/health", async (req: Request, res: Response)=> {
  res.json({ message: "health OK!" });
})

app.use("/api/my/user", myUserRoute);

app.listen(7001, ()=>{
  console.log("server started on localhost: 7001")
})