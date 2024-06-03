import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authApi';
import { LoginRequest } from '@/lib/types';

export type AuthState = {
    token?: string;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
};

const initialState: AuthState = {
    token: JSON.parse(String(localStorage.getItem('token'))),
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const login = createAsyncThunk('auth/login', async (user: LoginRequest, thunkAPI) => {
    try {
        return await authAPI.login(user);
    } catch (err: unknown) {
        return thunkAPI.rejectWithValue((err as { message: string }).message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    authAPI.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
                state.token = undefined;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = undefined;
            });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
