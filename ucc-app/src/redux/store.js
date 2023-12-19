import { configureStore } from '@reduxjs/toolkit';
import { authReducers } from './slices/auth';
import { usersReducers } from './slices/users';

const store = configureStore({
    reducer: {
        auth: authReducers,
        // users: usersReducers,
    },
});

export default store;
