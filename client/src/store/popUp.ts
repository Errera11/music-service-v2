import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const popupErrorTypes  = {
    401: 'You must authorize!',
    unrecognized: 'Sorry, some error occurred!'
}

export interface IPopUp {
    message?: string
    isSuccess: boolean | undefined
    type?: number // defines api status code
}

type PopUpState = IPopUp[]

const popUpInitialState: PopUpState = []

const popUpSlice = createSlice({
    name: 'popUp',
    initialState: popUpInitialState,
    reducers: {
        pushPopUp: (state, action: PayloadAction<IPopUp>) => {
            state.unshift(action.payload)
        },
        popPopUp: (state => {
            state.splice(state.length - 1)
        })
    }
})

export const {actions: popUpActions} = popUpSlice;

export default popUpSlice;