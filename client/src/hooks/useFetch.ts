import {useState} from "react";
import {AxiosResponse} from "axios";

type Callback<T> = (arg: any) => Promise<AxiosResponse<T>>

type ReturnType<T, A> = [
    fetch: (arg: A) => Promise<void>,
    isLoading: boolean,
    isError: boolean,
    data: T | undefined
]

const useFetch = <T>(fetchCallback: Callback<T>): ReturnType<T, Parameters<typeof fetchCallback>[0]> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [data, setData] = useState<T>();

    return [
        (arg) => fetchCallback(arg)
        .then((response) => {
            setIsError(false)
            setIsLoading(true)
            setData(response.data)
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false)),
        isLoading,
        isError,
        data
    ]
}

export default useFetch;