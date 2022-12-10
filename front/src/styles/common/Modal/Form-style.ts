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
    box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);
    z-index: 20;
    border-radius: 20px;
    background-color: ${color.white};
    height: 50%;
    width: 20%;
    min-width: 250px;
    min-height: 460px;
`;

export const FormTitle = styled.div`
    margin-bottom: 25px;
    font-size: 2rem;
    font-weight: bold;
`

export const FormButton = styled.button`
    width: 12rem;
    height: 2rem;
    margin-top: 15px;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    background-color: ${color.lightBlue};
    color: white;
`

export const Container = styled.div`
    position: relative;
    margin-bottom: 20px;
`

export const Input = styled.input`
    width: 200px;
    border: 1px solid #C9CACC;
    border-radius: 4px;
    box-sizing: border;
    padding: 8px 8px 8px 28px;
    font-size: 14px;
`
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
    
`
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

`


export const AccountMessage = styled.div`
    margin-top: 15px;
    font-size: 12px;
    font-weight: bold;
    
`
export const ConfirmAccount = styled.div`
    margin-top: 15px;

    font-size: 12px;
    font-weight: bold;
`

export const FindMessage = styled.div`
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: ${color.lightBlue};
`

export const ModalLabel = styled.label`
    font-size: 5px;
    color: ${color.gray};
`

export const ModalTab = styled.div`
    display: flex;
    margin-bottom: 25px;
`

export const ModalTabList = styled.li`
    list-style: none;
    font-weight: bold;
    text-decoration: underline;
    color: black;

    + li {
        margin-left: 10px;
    }
`

export const InputError = styled.div`
font-size: 5px;
color: ${color.red};
`