import React from "react";
import UserLogin from "@/components/user/UserLogin";
import UserRegister from "@/components/user/UserRegister";
import UserIdtoFind from "@/components/user/UserIdtoFind";
import UserPWtoFind from "@/components/user/UserPWtoFind";

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
        Component: UserLogin,
    },

    REGISTER: {
        path: "/register",
        Component: UserRegister,
    },

    FINDID: {
        path: "/findid",
        Component: UserIdtoFind,
    },

    FINDPW: {
        path: "/findpw",
        Component: UserPWtoFind,
    },
};

export const ROUTES_LIST: route[] = Object.values(ROUTES);
