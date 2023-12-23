import { body } from 'express-validator';

export const registerValidation = [
    body('fullName', 'Minimum length is 3 characters').isLength({ min: 3 }),
    body('email', 'Invalid email address').isEmail(),
    body('password', 'Minimum length is 1 character').isLength({ min: 1 }),
];

export const loginValidation = [
    body('email', 'Invalid email address').isEmail(),
    body('password', 'Required').isLength({ min: 1 }),
];
