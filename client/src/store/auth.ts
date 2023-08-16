import {User} from "@/assets/types/User";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface AuthState {
    user: User | null
}

const authInitialState: AuthState = {
    user: null
}

export const login = createAsyncThunk();
export const signup = createAsyncThunk();

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {

    },
    extraReducers: builder => {

    }
})