import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute";

// typescript : as string
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(()=> console.log("Connected to database!"))

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