import { Container, FlexBox } from "@/styles/chat/chat-style";
import { io } from "socket.io-client";
import { Route, Routes, Navigate } from "react-router-dom";
import ChatRoom from "@/components/chat/chatroom";
import WaitingRoom from "@/components/chat/waiting-room";
export const socket = io("http://localhost:4000");
export function Chat() {
    return (
        <>
            <FlexBox>
                <span>
                    <Container>
                        <WaitingRoom />
                    </Container>
                </span>
                <Container>
                    <Routes>
                        <Route path="/room/:roomName" element={<ChatRoom />} />
                    </Routes>
                </Container>
            </FlexBox>
        </>
    );
}
