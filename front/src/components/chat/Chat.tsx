import {
    ChatContainer,
    Container,
    Message,
    FlexBox,
    MessageBox,
    MessageForm,
} from "@/styles/chat/chat-style";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import classNames from "classnames";
import { ChatWindow } from "@/components/chat/chatwindow";
import { Route, Routes } from "react-router-dom";
import ChatRoom from "@/components/chat/chatroom";
import WaitingRoom from "@/components/chat/waiting-room";
export const socket = io("http://localhost:4000");

export function Chat() {
    return (
        <>
            <FlexBox>
                <Container>
                    <WaitingRoom />
                </Container>
                <Container>
                    <Routes>
                        <Route path="/room/:roomName" element={<ChatRoom />} />
                    </Routes>
                </Container>
            </FlexBox>
        </>
    );
}
