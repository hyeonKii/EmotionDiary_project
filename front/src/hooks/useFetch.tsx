import { useQuery } from "react-query";
import API from "@/api/API";

export default function useFetch(key: string, endpoint: string[]) {
    const { isLoading, isError, data } = useQuery(key, () => API(endpoint), {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (e: { message: string }) => {
            console.log(e.message);
        },
    });

    return { isLoading, isError, data };
}
