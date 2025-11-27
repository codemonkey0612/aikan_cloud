import * as UserModel from "../models/user.model";

export const getAllUsers = () => UserModel.getAllUsers();
export const getUserById = (id: number) => UserModel.getUserById(id);
export const createUser = (data: any) => UserModel.createUser(data);
export const updateUser = (id: number, data: any) =>
  UserModel.updateUser(id, data);
export const deleteUser = (id: number) => UserModel.deleteUser(id);
