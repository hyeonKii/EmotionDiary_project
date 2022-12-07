import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

const LeaveButton = styled.div`
    background: white;
    padding: 5px 5px 0px 5px;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: #f87474;
        color: white;
        height: 40px;
        border-radius: 10px;
    }
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 560px;
    overflow: auto;
    overflow-y: scroll;
    overflow-x: hidden;

    background: #ffffff;
`;

const MessageBox = styled.div`
    display: flex;
    flex-direction: column;

    &.my_message {
        align-self: flex-end;
        .message {
            background: #ffffff;
            border: 0.5px solid #000000;
            align-self: flex-end;
        }
    }

    &.alarm {
        align-self: center;
    }
`;

const Message = styled.span`
    margin-bottom: 0.5rem;
    background: #fff;
    background: #cecece;
    width: fit-content;
    padding: 12px;
    border-radius: 0.5rem;
`;

const MessageForm = styled.form`
    display: flex;
    /* margin-top: 24px; */
    background: white;
    /* 
    input {
        flex-grow: 1;
        margin-right: 1rem;
    } */
    div {
        display: flex;
        width: 100%;
        input {
            width: 80%;
            height: 50px;
            padding-left: 1.5rem;
            margin-left: 10px;
            border: 1px solid gray;
            border-radius: 8px;
            outline: none;
        }

        .submitButton {
            /* position: absolute; */
            right: 70px;

            width: 70px;
            height: 50px;
            margin-right: 0px;
            border: 1px solid ${color.lightBlue};
            border-radius: 0 8px 8px 0;
            background: ${color.lightBlue};

            color: white;
        }
    }
`;

export { LeaveButton, ChatContainer, MessageBox, Message, MessageForm };
