import {useState} from "react";
import {songsApi} from "@/api/songs";

export function useRemoveFromFavorite(): [((songId: number) => void), string, boolean] {
    const [error, setError] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState(false)
    return [(songId: number) => {
        const authToken = localStorage.getItem('authToken');
        if(!authToken) {
            setError('Authorize!')
            return [() => {}, error]
        }
        songsApi.removeFromFavorite(authToken, songId)
            .then(() => setIsSuccess(true))
            .catch(err => {
                setError('Error')
            })
    }, error, isSuccess]
}

