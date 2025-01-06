import { Router } from 'express';

import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
