import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        isBlocked: {
            type: Boolean,
            required: true,
            default: false,
        },
        lastLogin: {
            type: String,
            required: true,
            default: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${new Date().toDateString()}`,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);
