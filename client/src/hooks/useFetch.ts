import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

type Callback<T> = (...args: any[]) => Promise<AxiosResponse<T>>

type ReturnType<T> = [
    fetch: Function,
    data: T | undefined,
    isLoading: boolean,
    isError: boolean,
]

const useFetch = <T>(fetchCallback: Callback<T>): ReturnType<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [data, setData] = useState<T | undefined>(undefined)
    const fetch = () => fetchCallback()
            .then((response) => {
                setIsError(false)
                setIsLoading(true)
                setData(response.data)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));

    return [fetch, data, isLoading, isError]
}

export default useFetch;