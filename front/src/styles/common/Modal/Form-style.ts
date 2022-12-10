import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    padding: 3rem 0;
    border-radius: 20px;

    background: ${(isdark) => isdark.theme.modalBgColor};
    box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);

    .material-symbols-outlined {
        position: absolute;
        top: 20px;
        right: 20px;

        color: ${color.gray};
    }

    .countText {
        position: absolute;
        right: 20px;
        bottom: 26%;

        width: 70%;

        color: ${(isdark) => isdark.theme.textColor};
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

    .deleteButton {
        margin-top: 1rem;

        color: ${color.gray};
        font-size: 0.7rem;
    }
`;

export const FormTitle = styled.div`
    display: flex;
    align-items: center;
    height: 20%;

    color: ${(isdark) => isdark.theme.textColor};
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

    &:hover {
        background: ${color.deepBlue};
    }

    &:disabled {
        background: ${color.lightGray};
    }
`;

export const EditSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 70%;
    height: 50%;
`;

export const InputSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 70%;
    height: 40%;

    text-align: center;
`;

export const RegisterInputSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-item: center;

    width: 70%;
    height: 60%;

    text-align: center;
`;

export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    width: 100%;
    height: 65px;
    &:last-child {
        margin-bottom: 1rem;
    }

    label {
        flex: 0.5;
        margin-left: 0.3rem;
        margin-bottom: 0.5rem;

        color: ${(isdark) => isdark.theme.textColor};
        font-size: 0.8rem;
    }

    input {
        flex: 1.5;
        width: 100%;
        height: 40px;
        padding-left: 2.3rem;

        border: 1px solid ${color.lightGray};
        border-radius: 8px;
        outline: 0;
        background: ${(isdark) => isdark.theme.inputBgColor};
        color: ${(isdark) => isdark.theme.textColor};
    }

    .registerButton {
        position: absolute;
        right: 0;
        bottom: 0;

        width: 60px;
        height: 42px;
        border-radius: 0 8px 8px 0;
        background: ${color.lightBlue};
        color: ${color.white};
    }
`;

export const BottomSection = styled.div`
    width: 100%;
    height: 30%;

    text-align: center;
    font-size: 0.8rem;

    .register {
        margin: 2rem 0 0.8rem 0;
    }

    button:not(:first-child) {
        color: ${color.lightBlue};
    }
`;

export const PostBlock = styled.div`
    margin: 0 auto;
    width: 70%;
    height: 60%;
    margin-bottom: 1rem;

    select {
        width: 40%;
        height: 30px;
        margin-bottom: 0.5rem;
        padding: 0.3rem;
        outline: 0;

        background: ${(isdark) => isdark.theme.inputBgColor};
        color: ${(isdark) => isdark.theme.textColor};
    }

    #title {
        width: 100%;
        height: 30px;
        margin-bottom: 1rem;
        padding: 0.3rem;
        padding-left: 0.5rem;
        border: 0;
        border-bottom: 1px solid ${color.lightGray};
        outline: 0;

        background: ${(isdark) => isdark.theme.inputBgColor};
        color: ${(isdark) => isdark.theme.textColor};
    }

    #description {
        width: 100%;
        height: 70%;
        padding: 1rem;
        padding-bottom: 1.5rem;
        resize: none;

        border: 0;
        outline: 0;
        background: ${(isdark) => isdark.theme.textAreaBgColor};
        color: ${(isdark) => isdark.theme.textColor};

        word-break: break-all;
    }
`;

export const Error = styled.div`
    margin-top: 1rem;

    color: ${color.red};
    font-size: 0.8rem;
`;

export const Container = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    border: 1px solid #c9cacc;
    border-radius: 4px;
    box-sizing: border;
    padding: 8px 8px 8px 28px;
    font-size: 14px;
`;

export const AuthButton = styled.button`
    width: 17.5%;
    height: 2.7rem;
    position: absolute;
    margin-top: 22px;
    margin-left: 83.5%;

    border-radius: 0 8px 8px 0;

    background-color: ${color.lightBlue};
    color: white;
`;

export const CorrectButton = styled.button`
    width: 17.5%;
    height: 2.67rem;
    position: absolute;
    margin-top: 22.3px;
    margin-left: 83.5%;

    border-radius: 0 8px 8px 0;

    background-color: ${color.lightBlue};
    color: white;
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

export const SuccessMessage = styled.div`
    color: blue;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;


export const InputError = styled.div`
    font-size: 5px;
    color: ${color.red};
`;





//Find Modal
export const IDStyle = styled.div`
    span {
        color: lightblue;
    }
`;

export const FindError = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

export const SmallError = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;


export const Success = styled.div`
    color: blue;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

export const DescriptionLabel = styled.label`
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
`;
