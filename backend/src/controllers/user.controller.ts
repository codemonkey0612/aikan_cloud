import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await UserService.getUserById(Number(req.params.id));
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const created = await UserService.createUser(req.body);
  res.json(created);
};

export const updateUser = async (req: Request, res: Response) => {
  const updated = await UserService.updateUser(Number(req.params.id), req.body);
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  await UserService.deleteUser(Number(req.params.id));
  res.json({ message: "Deleted" });
};
