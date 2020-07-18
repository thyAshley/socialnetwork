import { Request, Response, NextFunction } from "express";

export const getProfile = (req: Request, res: Response, next: NextFunction) => {
  res.send("Profile route");
};
