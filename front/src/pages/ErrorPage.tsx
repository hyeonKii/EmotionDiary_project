import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/route";

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(ROUTES.LOGIN.path, { replace: true });
        }, 1000);
    });

    return <div>잘못된 접근</div>;
};

export default ErrorPage;
