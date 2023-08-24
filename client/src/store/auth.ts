import {User} from "@/assets/types/User";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {login, loginByAuthToken, logout, signup} from "@/api/auth";
import {
    AuthConstraintsError,
    AuthSuccessResponse,
    LoginRequest,
    SignUpRequest
} from "@/assets/types/HttpAuth";
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
            localStorage.setItem('authToken', (response.data as AuthSuccessResponse).authToken);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw e.response?.data.message
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
            localStorage.setItem('authToken', (response.data as AuthSuccessResponse).authToken);
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                throw e.response?.data.message
            }
            throw 'Unexpected error';
        }

    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const response = await logout();
            localStorage.setItem('authToken', '');
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw e.response?.data
            }
            throw 'Unexpected error';
        }

    }
);

export const loginByTokenThunk = createAsyncThunk(
    'auth/token',
    async ({authToken}: { authToken: string }) => {
        try {
            const response = await loginByAuthToken({authToken});
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw e.response?.data
            }
            throw 'Unexpected error';
        }
    }
)

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

        builder.addCase(loginThunk.rejected, (state, action) => {
            state.error = JSON.parse(action.error.message as string);
        })

        builder.addCase(logoutThunk.fulfilled, (state, action) => {
            state.user = undefined;
            state.error = undefined;
        })

        builder.addMatcher(isAnyOf(loginThunk.fulfilled, loginByTokenThunk.fulfilled), (state, action) => {
            if (state.error) state.error = undefined;
            state.user = action.payload as AuthSuccessResponse;
        })
    }
})

export default authSlice;