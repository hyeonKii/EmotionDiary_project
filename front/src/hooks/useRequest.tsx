import { useMutation } from "react-query";
import api from "@/api/api";

export default function useRequest(endpoint: string[], data: object) {
    const request = useMutation((requestData: object) => api(endpoint, requestData), {
        onSuccess: () => {
            console.log(`${endpoint[0]} 요청 성공`);
        },
        onError: () => {
            console.log(`${endpoint[0]} 요청 실패`);
        },
    });

    const requestHandler = () => {
        request.mutate(data);
    };

    return { requestHandler };
}
