import { useMutation } from "react-query";
import API from "@/api/API";

export default function useRequest(endpoint: string[], data: object) {
    const request = useMutation((requestData: object) => API(endpoint, requestData), {
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
