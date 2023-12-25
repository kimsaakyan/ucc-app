import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const { data } = await axios.get('/users');
    return data;
});

export const fetchUserRemove = createAsyncThunk(
    'fetchUserRemove',
    async (id) => {
        const { data } = await axios.delete(`/managment/users/${id}`);
        return data;
    }
);

export const fetchToggleUserBlock = createAsyncThunk(
    'fetchToggleUserBlock',
    async ({ id, action }) => {
        const { data } = await axios.patch(`/managment/users/${id}`, {
            action,
        });
        return data;
    }
);

const initialState = {
    users: [],
    status: 'loading',
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.users = [];
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.users = [];
                state.status = 'error';
            });
    },
});

export const usersReducers = userSlice.reducer;
