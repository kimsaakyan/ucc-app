import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const createAccount = async (req, res) => {
    try {
        const remarks = validationResult(req);

        if (!remarks.isEmpty()) {
            return res.status(400).json({ errors: remarks.array() });
        }

        const sameAccount = await UserModel.findOne({ email: req.body.email });
        if (sameAccount) {
            return res.status(400).json({
                errors: [{ param: 'email', msg: 'Email is already in use' }],
            });
        }

        const clientPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(clientPassword, 10);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            hashedPassword,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );

        const { hashedPassword: hashedPass, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ошибка при регистрации пользователя.',
        });
    }
};

export const loginAccount = async (req, res) => {
    try {
        const remarks = validationResult(req);

        if (!remarks.isEmpty()) {
            return res.status(400).json(remarks.array());
        }

        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isCorrectPassword = await bcrypt.compare(
            req.body.password,
            user._doc.hashedPassword
        );

        if (!isCorrectPassword) {
            return res.status(400).json({
                message: 'Данные не корректны',
            });
        }

        const token = await jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );

        await UserModel.findOneAndUpdate(
            { email: req.body.email },
            {
                lastLogin: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${new Date().toDateString()}`,
            },
            { new: true }
        );

        const { hashedPassword, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: 'Пользователь не найден',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userID);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};

export const deleteAccount = async (req, res) => {
    const deleteIDs = req.params.id;

    const arrOfDeleteIDs = deleteIDs.split(',');

    if (deleteIDs.length === 0) {
        return res.status(400).json({
            message: 'User is not chosen',
        });
    }

    await UserModel.deleteMany({ _id: { $in: arrOfDeleteIDs } });

    res.json({
        success: true,
        message: 'User deleted successfully',
    });
};

export const blockAccount = async (req, res) => {
    const IDs = req.params.id;
    const action = req.body.action;

    if (!IDs) {
        return res.status(400).json({
            message: 'User is not chosen',
        });
    }

    const arrOfIDs = IDs.split(',');

    switch (action) {
        case 'block': {
            await UserModel.updateMany(
                { _id: { $in: arrOfIDs } },
                { $set: { isBlocked: true } }
            );

            res.json({
                success: true,
                message: 'User blocked successfully',
            });

            break;
        }
        case 'unblock': {
            await UserModel.updateMany(
                { _id: { $in: arrOfIDs } },
                { $set: { isBlocked: false } }
            );

            res.json({
                success: true,
                message: 'User unblocked successfully',
            });

            break;
        }
        default: {
            break;
        }
    }
};
export const unblockAccount = async (req, res) => {
    const IDs = req.params.id;

    if (!IDs) {
        return res.status(400).json({
            message: 'User is not chosen',
        });
    }

    const arrOfIDs = IDs.split(',');

    try {
        await UserModel.updateMany(
            { _id: { $in: arrOfIDs } },
            { $set: { isBlocked: false } }
        );

        res.json({
            success: true,
            message: 'User unblocked successfully',
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    res.json(users);
};
