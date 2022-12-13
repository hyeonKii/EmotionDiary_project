import React from "react";


interface route {
    path: string;
}

interface routeWrap {
    [key: string]: route;
}

export const ROUTES: routeWrap = {
    LOGIN: {
        path: "/",
    }
}
export const ROUTES_LIST: route[] = Object.values(ROUTES);
