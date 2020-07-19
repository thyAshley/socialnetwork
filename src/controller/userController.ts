import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  res.send("User route");
};
