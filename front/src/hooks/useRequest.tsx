import { useMutation } from "react-query";
import api from "@/api/api";

export default function useRequest(endpoint: string[], requiredData: object) {
    const fetchFn = async (requestData: object) => {
        return await api(endpoint, requestData);
    };

    const { mutateAsync } = useMutation(fetchFn, {
        onSuccess: () => {
            console.log(`${endpoint[0]} 요청 성공`);
        },
        onError: () => {
            console.log(`${endpoint[0]} 요청 실패`);
        },
    });

    const requestHandler = async () => {
        const { data } = await mutateAsync(requiredData);
        return data;
    };

    return { requestHandler };
}
