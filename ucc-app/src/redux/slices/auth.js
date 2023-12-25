import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('fetchAuth', async (userData) => {
    const { data } = await axios.post('/login', userData);
    return data;
});

export const fetchAuthMe = createAsyncThunk('fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk(
    'fetchRegister',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/register', userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = 'loading';
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                if (!action.payload.isBlocked) {
                    state.data = action.payload;
                    state.status = 'loaded';
                } else {
                    state.data = null;
                    state.status = 'loading';
                }
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            });
    },
});

export const isAuthorized = (state) => Boolean(state.auth.data);

export const authReducers = authSlice.reducer;
export const { logout } = authSlice.actions;
