import React from "react";
import LoginForm from "@/components/user/UserLoginForm";
import RegisterForm from "@/components/user/UserRegisterForm";
import introduce from "@/pages/IntroducePage";
import ErrorPage from "@/pages/ErrorPage";
interface route {
    path: string;
    Component: React.FC;
}

interface routeWrap {
    [key: string]: route;
}

export const ROUTES: routeWrap = {
    LOGIN: {
        path: "/",
        Component: LoginForm,
    },

    REGISTER: {
        path: "/register",
        Component: RegisterForm,
    },

    INTRODUCE: {
        path: "/introduce",
        Component: introduce,
    },
    ErrorPage: {
        path: "*",
        Component: ErrorPage,
    },
};

export const ROUTES_LIST: route[] = Object.values(ROUTES);
