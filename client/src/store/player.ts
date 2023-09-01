import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Song} from "@/assets/types/Song";

interface PlayerState {
    currentTime: number
    isPlaying: boolean
    volume: number
    audio: string
    name: string
    artist: string
    image: string
    duration: number
}

const playerInitialState: PlayerState = {
    artist: "",
    audio: "",
    currentTime: 0,
    volume: 0.5,
    image: "",
    isPlaying: true,
    name: "",
    duration: 0,
}

const playerSlice = createSlice({
    name: 'player',
    initialState: playerInitialState,
    reducers: {
        setSong(state, action: PayloadAction<Song>) {
            return {...action.payload, currentTime: 0, volume: 0.5, isPlaying: true, duration: 0};
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        }
    },
})

export const {actions: playerActions} = playerSlice;

export default playerSlice;
