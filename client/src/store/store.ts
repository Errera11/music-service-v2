import {configureStore} from "@reduxjs/toolkit";
import currentPage from "@/store/appPage";
import auth from '@/store/auth';
import {createWrapper} from "next-redux-wrapper";

export const makeStore = () => configureStore({
    reducer: {
        [currentPage.name]: currentPage.reducer,
        [auth.name]: auth.reducer
    }
});

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);