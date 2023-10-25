import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Song} from "@/assets/types/Song";

interface IInitialSongsState {
    songs: Song[],
    currentSong: Song
}

const initialSongsState: IInitialSongsState = {
    songs: [],
    currentSong: {} as Song
}

const songsSlice = createSlice({
    name: 'songs',
    initialState: initialSongsState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.songs = action.payload;
        },
        skipNext: (state) => {
            if(state.currentSong?.id) {
                const indexOfSong = state.songs.findIndex(song => song.id === state.currentSong.id) + 1;
                if(indexOfSong > state.songs.length - 1) return
                state.currentSong = state.songs[indexOfSong]
            }
        },
        skipBack: (state) => {
            if(state.currentSong?.id) {
                const indexOfSong = state.songs.findIndex(song => song.id === state.currentSong.id) - 1;
                if(indexOfSong < 0) return
                state.currentSong = state.songs[indexOfSong]
            }
        },
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
        },
    }
})

export default songsSlice;

export const songActions = songsSlice.actions;