import { Request, Response } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/userModel';

const dataPath = './src/data/users.json';

const getUsersFromFile = (): User[] => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const saveUsersToFile = (users: User[]): void => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

export const getUsers = (req: Request, res: Response) => {
  const users = getUsersFromFile();
  res.status(200).json(users);
};

export const getUser = (req: Request, res: Response) => {
  const users = getUsersFromFile();
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = (req: Request, res: Response) => {
  const users = getUsersFromFile();
  const newUser: User = { id: uuidv4(), ...req.body };
  users.push(newUser);
  saveUsersToFile(users);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const users = getUsersFromFile();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    saveUsersToFile(users);
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  let users = getUsersFromFile();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    users = users.filter(u => u.id !== req.params.id);
    saveUsersToFile(users);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
