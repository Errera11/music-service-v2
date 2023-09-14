import {useState} from "react";

type Callback<T> = (...args: any[]) => Promise<T>

type ReturnType<T> = [
    fetch: (...args: any[]) => Promise<T | void>,
    isLoading: boolean,
    isError: boolean,
]

const useFetch = <T>(fetchCallback: Callback<T>): ReturnType<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const fetch = (...args: any[]) => fetchCallback(...args)
            .then((response) => {
                setIsError(false)
                setIsLoading(true)
                return response
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));

    return [fetch, isLoading, isError]
}

export default useFetch;