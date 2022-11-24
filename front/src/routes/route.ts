import React from "react";
import UserLoginForm from "@/components/user/UserLoginForm";
import UserRegisterForm from "@/components/user/UserRegisterForm";
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
    Component: UserLoginForm,

  },  
  
  REGISTER: {
    path: '/register',
    Component: UserRegisterForm,
  },

  FINDID: {
    path: '/findid',
    Component: UserIDtoFind,
  },

  FINDPW: {
    path: '/findpw',
    Component: UserPWtoFind,
  }
  
}

export const ROUTES_LIST: route[] = Object.values(ROUTES);