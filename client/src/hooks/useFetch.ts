import {useState} from "react";
import {AxiosResponse} from "axios";

type Callback<T> = (...args: any[]) => Promise<AxiosResponse<T>>

type ReturnType<T> = [
    fetch: (...args: any[]) => Promise<void>,
    isLoading: boolean,
    isError: boolean,
    data: T | undefined
]

const useFetch = <T>(fetchCallback: Callback<T>): ReturnType<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [data, setData] = useState<T>();

    const fetch = (...args: any[]) => fetchCallback(...args)
            .then((response) => {
                setIsError(false)
                setIsLoading(true)
                setData(response.data)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));

    return [fetch, isLoading, isError, data]
}

export default useFetch;