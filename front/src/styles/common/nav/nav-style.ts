import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { color } from "@/styles/common/colorPalette";

export const NavStyle = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 5;

    width: 100%;
    height: 65px;

    background-color: ${(isdark) => isdark.theme.navColor};
    box-shadow: 0 6px 6px -6px gray;

    font-size: 2rem;

    transition: background-color 0.5s linear;

    .loginButton {
        font-size: 1.3rem;
        margin-right: 3rem;
    }

    .navList {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        margin-right: 3rem;
        list-style: none;
    }

    .nickButton {
        padding: 0.5rem 0.8rem;
        border: 0;
        border-radius: 50%;

        margin-left: 1rem;
        background: ${color.lightGray};

        color: ${(isdark) => isdark.theme.textColor};
        font-size: 1.3rem;

        transition: color 0.5s linear;
    }
`;

export const LinkStyle = styled(NavLink)`
    margin: 0 1rem;
    text-decoration: none;

    color: ${(isdark) => isdark.theme.textColor};
    font-size: 1.3rem;

    &.logo {
        margin-left: 3rem;

        color: ${(isdark) => isdark.theme.textColor};
        font-family: diary;
        font-size: 2rem;

        transition: color 0.5s linear;
    }
`;

export const DropDownStyle = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 65px;
    right: 0;

    width: 150px;
    height: 100px;

    list-style: none;
    background: ${color.white};

    text-align: center;

    button {
        width: 100%;

        font-size: 1.2rem;
        line-height: 45px;

        &:first-child {
            border-bottom: 1px solid ${color.lightGray};
        }
    }
`;
