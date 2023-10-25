import {Song} from "@/assets/types/Song";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {songActions} from "@/store/song";
import {useCallback} from "react";
import {playerActions} from "@/store/player";

export function useSong() {
    const dispatch = useAppDispatch();
    const song = useTypedSelector(state => state.songs.currentSong);
    const {setCurrentTime} = playerActions;
    const {skipNext, skipBack} = songActions;

    const skipSong = useCallback(() => {
        dispatch(setCurrentTime(0));
        dispatch(skipNext());
    }, [])

    const skipBackSong = useCallback(() => {
        song && dispatch(setCurrentTime(0));
        dispatch(skipBack());
    }, [])

    const {setCurrentSong} = songActions;
    return {
        currentSong: song,
        setSong: (song: Song) => dispatch(setCurrentSong(song)),
        skipSong,
        skipBackSong
    }
}