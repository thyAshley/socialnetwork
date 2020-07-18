import { Request, Response, NextFunction } from "express";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("User route");
};
