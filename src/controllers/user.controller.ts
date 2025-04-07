import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

const userService = new UserService();

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers(true);
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await userService.createUser(name, email);
  res.json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedUser = await userService.updateUser(Number(id), updates);
  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(Number(id));
  res.json(result);
};
