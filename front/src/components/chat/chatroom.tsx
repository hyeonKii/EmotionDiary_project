import classNames from "classnames";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "@/components/chat/Chat";
import { currentUser } from "@/temp/userAtom";
import * as api from "@/api/chat";
import { recentlyMsgState } from "@/temp/ChatRecoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { currentroom } from "@/temp/ChatRecoil";
import {
    ChatContainer,
    LeaveButton,
    Message,
    MessageBox,
    MessageForm,
} from "@/styles/chat/chatroom-style";

interface ChatData {
    sender: string;
    msgText: string;
    chatRoom: string;
}

export const ChatRoom = () => {
    const [chats, setChats] = useState<ChatData[]>([]);
    const [msgText, setMsgText] = useState<string>("");
    const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    const chatContainerEl = useRef<HTMLDivElement>(null);
    let { roomName } = useParams<"roomName">();
    const chatRoom = roomName;
    let { room } = useParams();
    // const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    const [recentlyMessage, setRecentlyMessage] = useRecoilState(recentlyMsgState);
    const user = useRecoilValue(currentUser);
    const current_room = useRecoilValue(currentroom);
    const userid = String(user?.id);
    const navigate = useNavigate();
    //todo : usecallback 사용하기

    // 채팅이 길어지면(chats.length) 스크롤이 생성되므로, 스크롤의 위치를 최근 메시지에 위치시키기 위함
    useEffect(() => {
        if (!chatContainerEl.current) return;

        const chatContainer = chatContainerEl.current;
        const { scrollHeight, clientHeight } = chatContainer;

        if (scrollHeight > clientHeight) {
            chatContainer.scrollTop = scrollHeight - clientHeight;
        }
        console.log(chats, roomName);
    }, [chats.length]);

    // message event listener
    useEffect(() => {
        const messageHandler = (chat: ChatData) => {
            if (chat === null) {
                return null;
            }
            console.log("실행", chat);

            // if (chat.roomName == currentsroom) {
            setChats((prevChats) => [...prevChats, chat]);
            setRecentlyMessage(chat);
            // }
            console.log(chat, roomName, current_room);
            console.log(currentsroom);
        };
        const leaveRoomHandler = (roomName: string) => {
            setCurrentsroom(roomName);
        };

        socket.on("message", messageHandler);
        socket.on("leave-room", leaveRoomHandler);
        return () => {
            socket.off("message", messageHandler);
            socket.off("leave-room", leaveRoomHandler);
        };
    }, []);

    useEffect(() => {
        getMessegetext(roomName);
        // console.log("the rooms change", roomName);
        if (roomName !== undefined) {
            setCurrentsroom(roomName);
        }
    }, [roomName]);

    //전체 메세지 받아오기
    const getMessegetext = async (roomName: string | undefined) => {
        try {
            const { data } = await api.getMessege(roomName);
            setChats(data.result);
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    // const getRecentlyMessege = async (roomName: string | undefined) => {
    //     try {
    //         const { data } = await api.getMessege(roomName);
    //         setChats(data.result);
    //         return data;
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMsgText(e.target.value);
    }, []);

    const onSendMessage = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!msgText) return alert("메시지를 입력해 주세요.");

            socket.emit("message", { chatRoom, msgText, userid }, (chat: ChatData) => {
                setChats((prevChats) => [...prevChats, chat]);
            });
            setMsgText("");
        },
        [msgText, roomName]
    );

    const onLeaveRoom = useCallback(() => {
        socket.emit("leave-room", roomName, () => {});
        navigate("/");
    }, [navigate, roomName]);

    return (
        <>
            <LeaveButton onClick={onLeaveRoom}>
                <button>방 나가기{roomName}</button>
            </LeaveButton>
            <ChatContainer ref={chatContainerEl}>
                {chats.map((chat, index) =>
                    chat.chatRoom == roomName ? (
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
                    ) : (
                        ""
                    )
                )}
            </ChatContainer>
            <MessageForm onSubmit={onSendMessage}>
                <div>
                    <input type="text" onChange={onChange} value={msgText}></input>
                    <button className="submitButton">전송</button>
                </div>
            </MessageForm>
        </>
    );
};
export default ChatRoom;
