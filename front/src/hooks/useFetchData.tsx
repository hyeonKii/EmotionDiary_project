import { useQuery } from "react-query";
import api from "@/api/api";

export default function useFetchData(key: string, endpoint: string[]) {
    const { isLoading, isError, data, error } = useQuery(key, () => api(endpoint), {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (e: { message: string }) => {
            console.log(e.message);
        },
    });

    return { isLoading, isError, data, error };
}
