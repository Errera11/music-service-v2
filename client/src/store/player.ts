import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Song} from "@/assets/types/Song";

interface PlayerState extends Song{
    currentTime: number
    isPlaying: boolean
    volume: number
}

const playerInitialState: PlayerState = {
    id: 0,
    description: "",
    artist: "",
    audio: "",
    title: "",
    currentTime: 0,
    volume: 0.5,
    image: "",
    isPlaying: true,
    name: "",
    duration: 0,
    isLiked: false
}

const playerSlice = createSlice({
    name: 'player',
    initialState: playerInitialState,
    reducers: {
        setSong(state, action: PayloadAction<Song>) {
            return { ...action.payload, currentTime: 0, isPlaying: true, duration: 0, volume: state.volume};
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
