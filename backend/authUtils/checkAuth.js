import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            req.userID = decodedToken._id;
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};

export default checkAuth;
