import { configureStore} from "@reduxjs/toolkit";
import auth from '@/store/auth';
import {createWrapper} from "next-redux-wrapper";
import player from "@/store/player";
import songs from "@/store/song";

export const makeStore = () => configureStore({
    reducer: {
        [auth.name]: auth.reducer,
        [player.name]: player.reducer,
        [songs.name]: songs.reducer
    }
});

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];


export const wrapper = createWrapper<AppStore>(makeStore);