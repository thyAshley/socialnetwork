import { Request, Response, NextFunction } from "express";

export const getAuth = (req: Request, res: Response, next: NextFunction) => {
  res.send("Auth route");
};
