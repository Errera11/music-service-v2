import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import authSlice from "@/store/auth";
import playerSlice from "@/store/player";


interface PopUpState {
    message: string | ''
    isSuccess: boolean | undefined
}

const popUpInitialState: PopUpState = {
    message: '',
    isSuccess: undefined
}

const popUpSlice = createSlice({
    name: 'popUp',
    initialState: popUpInitialState,
    reducers: {
        setPopUp: (state, action: PayloadAction<PopUpState>) => {
            state.message = action.payload.message
            state.isSuccess = action.payload.isSuccess
        },
        resetPopUp: (state => {
            state.message = ''
            state.isSuccess = undefined
        })
    }
})

export const {actions: popUpActions} = popUpSlice;

export default popUpSlice;