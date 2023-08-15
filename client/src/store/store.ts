import {configureStore} from "@reduxjs/toolkit";
import currentPage from "@/store/appPage";
import {createWrapper} from "next-redux-wrapper";

export const makeStore = () => configureStore({
    reducer: {
        [currentPage.name]: currentPage.reducer
    }
});

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);