import {useState} from "react";
import {AxiosResponse} from "axios";

type Callback<T> = (arg: any) => Promise<AxiosResponse<T>>;

type ReturnType<T, A> = {
    fetch: (arg: A) => Promise<void>,
    isLoading: boolean,
    isError: boolean,
    data: T | undefined
}

const useFetch = <T, A>(fetchCallback: Callback<T>): ReturnType<T, A> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [data, setData] = useState<T>();

    const fetch = (arg: A) => {
        setIsLoading(true);
        return fetchCallback(arg)
            .then((response) => {
                setIsError(false)
                setIsLoading(true)
                setData(response.data)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }

    return {fetch, isLoading, isError, data}
}

export default useFetch;