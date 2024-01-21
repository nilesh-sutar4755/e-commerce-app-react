import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react"

interface ApiConfig {
    url: string;
    method?: 'get' | 'post' | 'put' | 'patch';
    body?: {}
}

const useData = <T>(apiConfig: ApiConfig, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch data on mount and re-fetch if dependencies change
    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        (async () => {
            const type = apiConfig.method || 'get';
            const body = apiConfig.body || null;
            try {
                const res = await axios[type]<T>(apiConfig.url, body, {
                    signal: controller.signal,
                    ...requestConfig
                })
                if (res.data) {
                    setData(res.data);
                } else {
                    throw Error('No data in response');
                }
                setIsLoading(false);
            } catch (error) {
                if (controller.signal.aborted) return;
                setError((error as AxiosError).message);
                setIsLoading(false)
            }
        })();

        return () => controller.abort()
    }, deps ? [...deps] : [])

    return { data, error, isLoading }
}

export default useData