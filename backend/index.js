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

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: 'https://ucc-app-b.vercel.app/', // Замените на фактический домен вашего клиентского приложения
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    })
);

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
