import {Song} from "@/assets/types/Song";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {songActions} from "@/store/song";
import {useCallback} from "react";
import {playerActions} from "@/store/player";

export function useSong() {
    const dispatch = useAppDispatch();
    const {currentSong: song, songs: songsList} = useTypedSelector(state => state.songs);
    const {skipNext, skipBack} = songActions;
    const {setCurrentTime, setIsPlaying} = playerActions;
    const {setCurrentSong, setSongs: setSongsAC} = songActions;

    const skipSong = useCallback(() => {
        dispatch(setCurrentTime(0));
        dispatch(skipNext());
    }, [])

    const skipBackSong = useCallback(() => {
        dispatch(setCurrentTime(0));
        dispatch(skipBack());
    }, [])

    const setSong = (song: Song) => {
        dispatch(setCurrentTime(0));
        dispatch(setIsPlaying(true));
        dispatch(setCurrentSong(song));
    }

    const setSongs = useCallback((songs: Song[]) => {
        dispatch(setSongsAC(songs));
    }, []);

    return {
        currentSong: song,
        skipSong,
        skipBackSong,
        setSong,
        setSongs,
        songsList,
        song
    }
}