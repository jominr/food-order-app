import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 *1024, // 5MB
  }
})

// /ap/my/restaurant
/* 我把upload.single("imageFile")放在validateMyRestaurantRequest的前面，
    validateMyRestaurantRequest就会报错，这是为什么呀?
 */
router.post(
  "/", 
  validateMyRestaurantRequest,
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;