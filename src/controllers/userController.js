"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const dataPath = './src/data/users.json';
const getUsersFromFile = () => {
    const data = fs_1.default.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};
const saveUsersToFile = (users) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};
const getUsers = (req, res) => {
    const users = getUsersFromFile();
    res.status(200).json(users);
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const users = getUsersFromFile();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.getUser = getUser;
const createUser = (req, res) => {
    const users = getUsersFromFile();
    const newUser = Object.assign({ id: (0, uuid_1.v4)() }, req.body);
    users.push(newUser);
    saveUsersToFile(users);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const users = getUsersFromFile();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        const updatedUser = Object.assign(Object.assign({}, users[index]), req.body);
        users[index] = updatedUser;
        saveUsersToFile(users);
        res.status(200).json(updatedUser);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    let users = getUsersFromFile();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users = users.filter(u => u.id !== req.params.id);
        saveUsersToFile(users);
        res.status(200).json({ message: 'User deleted' });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.deleteUser = deleteUser;
