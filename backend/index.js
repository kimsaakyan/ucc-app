import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as UserController from './controllers/UserController.js';
import {
    registerValidation,
    loginValidation,
} from './authUtils/validations/user-auth.js';
import checkAuth from './authUtils/checkAuth.js';

dotenv.config();

mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@user-data.sjmc7n6.mongodb.net/userStorage?retryWrites=true&w=majority`
);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', registerValidation, UserController.createAccount);
app.post('/login', loginValidation, UserController.loginAccount);
app.get('/auth/me', checkAuth, UserController.getMe);

app.delete('/managment/users/:id', checkAuth, UserController.deleteAccount);
app.patch('/managment/users/:id', checkAuth, UserController.blockAccount);
app.patch('/managment/users/:id', checkAuth, UserController.unblockAccount);

app.get('/users', checkAuth, UserController.getAllUsers);

app.listen(3333, (err) => {
    if (err) console.log('Error in server setup');
    console.log('Server listening on Port', 3333);
});
