import { loading } from "@/assets/images";
import { LoadingStyle } from "@/styles/common/loading/loading-style";

export default function Loading() {
    return (
        <LoadingStyle>
            <img src={loading} alt="loading" />
        </LoadingStyle>
    );
}
