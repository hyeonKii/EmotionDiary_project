import React from "react";
import UserLogin from "@/components/user/UserLogin";
import UserRegister from "@/components/user/UserRegister";
import UserIDtoFind from "@/components/user/UserIDtoFind";
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
        Component: UserIDtoFind,
    },

    FINDPW: {
        path: "/findpw",
        Component: UserPWtoFind,
    },
};

export const ROUTES_LIST: route[] = Object.values(ROUTES);
