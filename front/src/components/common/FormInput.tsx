import React from "react";
import { InputDataType } from "@/types/inputData_type";
import styled from "styled-components";
import AuthEmail from "@/components/common/AuthEmail";
import Certification from "@/components/common/Certification";

import ID from "@/components/UI/images/id.svg";
import Icon from "@/components/UI/icon";


type Props = {
    inputData: InputDataType;
    form: any;
    validatedForm: any;
    onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
};

export default function FormInput({ inputData, form, validatedForm, onChangeHandler }: Props) {
    return (
        <>
            {inputData.map((data, index) => {
                return (
                    <Container key={data.name + index}>
                        {/* <label htmlFor={data.name}></label> */}


                        {/* <IDIcon src={ID} /> */}
                        <Icon 
                            icon= {(data.name === "email") ? "email" : (data.name === "password") ? "password" : (data.name == "certification") ? "certification" : (data.name === "correctPassword")? "correctPassword" : "userID"} />
                        
                        <Input 
                            placeholder= {data.description}
                            id={data.name}
                            type={data.type}
                            value={form[data.name]}
                            onChange={onChangeHandler}
                        />
                        {data.name ==="email" && <AuthButton onClick={AuthEmail}>인증</AuthButton>}
                        {data.name === "certification" && <CorrectButton onClick={Certification}>확인</CorrectButton>}
                        {validatedForm[data.name] && <div>{`${data.name} 에러`}</div>}
                    </Container>
                );
            })}
        </>
    );
}

const Container = styled.div`
    position: relative;
    margin-bottom: 20px;
`

const Input = styled.input`
    width: 200px;
    border: 1px solid #C9CACC;
    border-radius: 4px;
    box-sizing: border;
    padding: 8px 8px 8px 28px;
    font-size: 14px;
`
const AuthButton = styled.button`
    width: 2.5rem;
    height: 2.15rem;

    position: absolute;
    right: 0.2px;

    outline: none;
    border: none;
    border-radius: 4px;
   
    background-color: #47B5FF;
    color: white;

    font-size: 12px;
    
`
const CorrectButton = styled.button`
    width: 2.5rem;
    height: 2.15rem;

    position: absolute;
    right: 0.2px;

    outline: none;
    border: none;
    border-radius: 4px;
   
    background-color: #47B5FF;
    color: white;

    font-size: 12px;

`


// const IDIcon = styled.img`
//    position: absolute;
//    top: 6px;
//    left: 8px;
//    weight: 20px;
//    height: 20px;
// `

