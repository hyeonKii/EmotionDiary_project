import React from "react";
import LoginForm from "@/component/User/LoginForm";
import RegisterForm from "@/component/User/RegisterForm";

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
    path: '/register',
    Component: RegisterForm,
  },
  
}

export const ROUTES_LIST: route[] = Object.values(ROUTES);