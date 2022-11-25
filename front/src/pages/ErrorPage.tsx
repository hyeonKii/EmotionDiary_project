import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/route";

const ErrorPage = () => {
    const navigate = useNavigate();

    /* 3초 뒤 리다이렉트 코드 */
    useEffect(() => {
        setTimeout(() => {
            navigate(ROUTES.Home.path, { replace: true });
        }, 1000);
    });

    return (
        <div>
            3초 후 <br /> 홈으로 새로고침 됩니다...
        </div>
    );
};

export default ErrorPage;
