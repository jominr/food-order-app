import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// 这种函数用了async，为什么不用加await，是因为是middleware, 后面会有异步函数吗
const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 400: bad quest.
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
// array: 可以让我们添加一系列中间件，
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];
