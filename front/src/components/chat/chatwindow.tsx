import {
    Container,
    ChatContainer,
    Message,
    MessageBox,
    MessageForm,
} from "@/styles/chat/chat-style";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import classNames from "classnames";
import { socket } from "@/components/chat/Chat";

interface IChat {
    username: string;
    message: string;
}

export function ChatWindow() {
    const [chats, setChats] = useState<IChat[]>([]);
    const [message, setMessage] = useState<string>("");
    const chatContainerEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const messageHandler = (chat: IChat) => setChats((prevChats) => [...prevChats, chat]);
        const changeName = () => {};
        socket.on("message", messageHandler);
        return () => {
            socket.off("message", messageHandler);
        };
    }, []);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }, []);

    const onSendMessage = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            console.log("send");
            e.preventDefault();
            if (!message) return alert("메시지를 입력해 주세요.");
            socket.emit("message", message, "나", (chat: IChat) => {
                setChats((prevChats) => [...prevChats, chat]);
            });
            setMessage("");
        },
        [message]
    );
    console.log();
    return (
        <>
            <Container>
                <ChatContainer ref={chatContainerEl}>
                    {chats.map((chat, index) => (
                        <MessageBox
                            key={index}
                            className={classNames({
                                my_message: "나" === chat.username,
                                alarm: !chat.username,
                            })}
                        >
                            <span>
                                {chat.username
                                    ? socket.id === chat.username
                                        ? ""
                                        : chat.username
                                    : ""}
                            </span>
                            <Message className="message">{chat.message}</Message>
                        </MessageBox>
                    ))}
                </ChatContainer>
                <MessageForm onSubmit={onSendMessage}>
                    <input type="text" onChange={onChange} value={message} />
                    <button>보내기</button>
                </MessageForm>
            </Container>
        </>
    );
}
