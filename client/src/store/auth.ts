import {User} from "@/assets/types/User";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, signup} from "@/api/auth";
import {AuthConstraintsError, AuthSuccessResponse, LoginRequest, SignUpRequest} from "@/assets/types/HttpAuth";
import axios from "axios";

interface AuthState {
    user: User | undefined,
    error: AuthConstraintsError | undefined
}

const authInitialState: AuthState = {
    user: undefined,
    error: undefined
}

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({email, password}: LoginRequest) => {
        try {
            const response = await login({email, password});
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw JSON.stringify(e.response?.data.message)
            }
            throw 'Unexpected error';
        }
    }
);
export const signupThunk = createAsyncThunk(
    'auth/signup',
    async ({email, password, name}: SignUpRequest) => {
        try {
            const response = await signup({email, password, name});
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw JSON.stringify(e.response?.data.message)
            }
            throw 'Unexpected error';
        }

    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupThunk.fulfilled, (state, action) => {
            if (state.error) state.error = undefined;
            state.user = action.payload as AuthSuccessResponse;
        })
        builder.addCase(signupThunk.rejected, (state, action) => {
            state.error = JSON.parse(action.error.message as string);
        })
    }
})

export default authSlice;