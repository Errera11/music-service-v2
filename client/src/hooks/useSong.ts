import {Song} from "@/assets/types/Song";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {playerActions} from "@/store/player";

export function useSong(): [Song, (song: Song) => void] {
    const dispatch = useAppDispatch();
    const song = useTypedSelector(state => state.player);
    return [song, (song: Song) => dispatch(playerActions.setSong(song))];
}