import {useState} from "react";

type FnReturnType<R, A> = {
    fetch: (arg: A) => Promise<R>,
    isLoading: boolean,
    isError: boolean
}

const useFetch = <T extends (args: any) => any>(fetchCallback: T): FnReturnType<Awaited<ReturnType<T>>, Parameters<T>[0]> => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetch: (args: any) => ReturnType<T> = (arg) => {
        setIsLoading(true);
        return fetchCallback(arg)
            .then((response: ReturnType<Awaited<typeof fetchCallback>>) => {
                setIsError(false);
                return response;
            })
            .catch((e: any) => {
                setIsError(true)
                throw e
            })
            .finally(() => setIsLoading(false));
    }

    return {fetch, isLoading, isError}
}

export default useFetch;