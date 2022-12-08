import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;

    width: 30%;
    height: 50%;
    min-width: 400px;
    min-height: 550px;
    border-radius: 20px;

    background: ${color.white};
    box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);

    .material-symbols-outlined {
        position: absolute;
        top: 20px;
        right: 20px;

        color: ${color.gray};
    }

    .countText {
        position: absolute;
        right: 15px;
        bottom: 25%;

        width: 70%;

        font-size: 0.5rem;
        text-align: center;
    }

    .maxText {
        color: ${color.red};
    }

    .todayText {
        width: 70%;
        margin: 2rem 0;

        text-align: center;
        line-height: 30px;
    }
`;

export const PostBlock = styled.div`
    margin: 0 auto;
    width: 70%;
    height: 55%;

    select {
        width: 40%;
        height: 25px;
        margin-bottom: 1rem;
        outline: 0;
    }

    #title {
        width: 100%;
        margin-bottom: 1rem;
        padding-top: 0.5rem;
        padding-left: 0.5rem;
        border: 0;
        border-bottom: 1px solid ${color.lightGray};
        outline: 0;
    }

    #description {
        width: 100%;
        height: 70%;
        margin-bottom: 1rem;
        padding-top: 0.5rem;
        padding-left: 0.5rem;
        resize: none;

        border: 0;
        outline: 0;
        background: ${color.lightGray};

        word-break: break-all;
    }
`;

export const FormTitle = styled.div`
    margin-bottom: 20px;

    font-size: 2rem;
    font-weight: bold;
`;

export const FormButton = styled.button`
    width: 70%;
    height: 40px;
    margin-top: 15px;
    outline: 0;
    border: 0;
    border-radius: 8px;

    background: ${color.lightBlue};

    color: ${color.white};
    font-size: 0.8rem;

    &:disabled {
        background: ${color.lightGray};
    }
`;

export const Container = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    width: 200px;
    border: 1px solid #c9cacc;
    border-radius: 4px;
    box-sizing: border;
    padding: 8px 8px 8px 28px;
    font-size: 14px;
`;

export const AuthButton = styled.button`
    width: 2.5rem;
    height: 2.15rem;

    position: absolute;
    right: 0.2px;

    outline: none;
    border: none;
    border-radius: 4px;

    background-color: ${color.lightBlue};
    color: ${color.white};

    font-size: 12px;
`;

export const CorrectButton = styled.button`
    width: 2.5rem;
    height: 2.15rem;

    position: absolute;
    right: 0.2px;

    outline: none;
    border: none;
    border-radius: 4px;

    background-color: ${color.lightBlue};
    color: ${color.white};

    font-size: 12px;
`;

export const AccountMessage = styled.div`
    margin-top: 15px;
    font-size: 12px;
    font-weight: bold;
`;
export const ConfirmAccount = styled.div`
    margin-top: 15px;

    font-size: 12px;
    font-weight: bold;
`;

export const FindMessage = styled.div`
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: ${color.lightBlue};
`;

export const ModalLabel = styled.label`
    font-size: 5px;
    color: ${color.gray};
`;

export const ModalTab = styled.div`
    display: flex;
    margin-bottom: 25px;
`;

export const ModalTabList = styled.li`
    list-style: none;
    font-weight: bold;
    text-decoration: underline;
    color: black;

    + li {
        margin-left: 10px;
    }
`;

export const InputError = styled.div`
    font-size: 5px;
    color: ${color.red};
`;
