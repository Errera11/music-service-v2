import {createSlice} from "@reduxjs/toolkit";
import {NavbarPages} from "@/assets/types/Navbar";
import {HYDRATE} from "next-redux-wrapper";

export interface AppPageState {
    currentPage: NavbarPages
}

const currentPageInitialState: AppPageState = {
    currentPage: NavbarPages.HOME
}

const appPageSlice = createSlice({
    name: 'AppPage',
    initialState: currentPageInitialState,
    reducers: {
        setAppPage(state, action) {
            console.log(action);
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { setAppPage } = appPageSlice.actions;

export default appPageSlice;

