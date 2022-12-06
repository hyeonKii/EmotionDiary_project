import classNames from "classnames";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "@/components/chat/Chat";
import { currentUser } from "@/temp/userAtom";
import * as api from "@/api/chat";
import { useRecoilValue, useRecoilState } from "recoil";
import { chatMessgeList } from "@/temp/ChatRecoil";
import {
    ChatContainer,
    LeaveButton,
    Message,
    MessageBox,
    MessageForm,
} from "@/styles/chat/chatroom-style";

interface IChat {
    sender: string;
    msgText: string;
}

export const ChatRoom = () => {
    const [chats, setChats] = useState<IChat[]>([
        {
            sender: "3",
            msgText: "zzz",
        },
    ]);
    // const [chats, setChats] = useRecoilState(chatMessgeList);
    const [msgText, setMessage] = useState<string>("");
    const chatContainerEl = useRef<HTMLDivElement>(null);
    const { roomName } = useParams<"roomName">();
    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);
    const userid = String(user?.id);

    const getMessegetext = async (roomName: string | undefined) => {
        try {
            const { data } = await api.getMessege(roomName);
            console.log(data, "messege", chats);
            setChats(data.result);
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    // 채팅이 길어지면(chats.length) 스크롤이 생성되므로, 스크롤의 위치를 최근 메시지에 위치시키기 위함
    useEffect(() => {
        if (!chatContainerEl.current) return;

        const chatContainer = chatContainerEl.current;
        const { scrollHeight, clientHeight } = chatContainer;

        if (scrollHeight > clientHeight) {
            chatContainer.scrollTop = scrollHeight - clientHeight;
        }
    }, [chats.length]);

    // message event listener
    useEffect(() => {
        const messageHandler = (chat: IChat) => setChats((prevChats) => [...prevChats, chat]);

        socket.on("message", messageHandler);

        // getMessegetext(roomName);

        return () => {
            socket.off("message", messageHandler);
        };
    }, []);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }, []);

    useEffect(() => {
        getMessegetext(roomName);
    }, [roomName]);

    const onSendMessage = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!msgText) return alert("메시지를 입력해 주세요.");

            socket.emit("message", { roomName, msgText, userid }, (chat: IChat) => {
                setChats((prevChats) => [...prevChats, chat]);
            });
            setMessage("");
            console.log(chats);
        },
        [msgText, roomName]
    );

    const onLeaveRoom = useCallback(() => {
        socket.emit("leave-room", roomName, () => {});
        navigate("/");
    }, [navigate, roomName]);

    if (window.performance) {
        if (performance.navigation.type == 1) {
        } else {
            console.log("새로고침");
        }
    }
    return (
        <>
            <h1>Chat Room: {roomName}</h1>
            <LeaveButton onClick={onLeaveRoom}>방 나가기</LeaveButton>
            <ChatContainer ref={chatContainerEl}>
                {chats.map((chat, index) => (
                    <MessageBox
                        key={index}
                        className={classNames({
                            my_message: userid === chat.sender,
                            alarm: !chat.sender,
                        })}
                    >
                        <span>
                            {/* {chat.sender ? (socket.id === chat.sender ? "" : chat.sender) : ""} */}
                        </span>
                        <Message className="message">{chat.msgText}</Message>
                    </MessageBox>
                ))}
            </ChatContainer>
            <MessageForm onSubmit={onSendMessage}>
                <input type="text" onChange={onChange} value={msgText} />
                <button>보내기</button>
            </MessageForm>
        </>
    );
};
export default ChatRoom;
