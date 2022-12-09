import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "@/api/chat";
import { Head, Table, ChatRoom } from "@/styles/chat/waiting-room.styles";
import { socket } from "@/components/chat/Chat";
import { recentlyMsgState } from "@/temp/ChatRecoil";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

interface CreateRoomResponse {
    success: boolean;
    payload: string;
}

interface ChatData {
    sender: string;
    msgText: string;
    roomName: string;
}

const WaitingRoom = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    let [recentlyMessage, setRecentlyMessage] = useRecoilState(recentlyMsgState);
    const [lastMessage, setLastMessage] = useState<
        | {
              updatedAt: string;
              user_model_id: string;
              lastmessage: string;
          }[]
        | null
    >(null);

    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);
    const recentMessage = useRecoilValue(recentlyMsgState);
    const setrecentMessage = useSetRecoilState(recentlyMsgState);
    useEffect(() => {
        // console.log(rooms, "room");
        const roomListHandler = (rooms: string[]) => {
            setRooms(rooms);
        };
        const createRoomHandler = (response: any) => {
            console.log(response.result, "create lastmessage");
            setLastMessage(response.result);
        };
        const deleteRoomHandler = (roomName: string) => {
            setRooms((prevRooms) => prevRooms.filter((room) => room !== roomName));
        };
        const messageHandler = (chat: ChatData) => {
            console.log(chat);
            setrecentMessage({
                sender: chat.sender,
                msgText: chat.msgText,
            });
            lastMessage?.map((item) => {
                if (item.user_model_id == chat.roomName) {
                    item.lastmessage = chat.msgText;
                }
                return item;
            });
            console.log(lastMessage, "console");
            // 어쩔때 null이 되는거지??
            if (lastMessage === null) return;
            setLastMessage(lastMessage);
        };
        socket.emit("room-list", String(user?.id), roomListHandler);

        socket.on("create-room", createRoomHandler);
        socket.on("delete-room", deleteRoomHandler);
        socket.on("message", messageHandler);

        return () => {
            socket.off("room-list", roomListHandler);
            socket.off("create-room", createRoomHandler);
            socket.off("delete-room", deleteRoomHandler);
        };
    }, []);

    const onCreateRoom = useCallback(() => {
        const roomName = prompt("방 이름을 입력해 주세요.");
        if (!roomName) return alert("방 이름은 반드시 입력해야 합니다.");

        socket.emit("create-room", roomName, (response: CreateRoomResponse) => {
            if (!response.success) return alert(response.payload);

            navigate(`/room/${response.payload}`);
        });
    }, [navigate]);

    //()=> 지우기
    const onJoinRoom = useCallback(
        (roomName: string) => () => {
            socket.emit("join-room", roomName, () => {
                console.log(roomName, "joinroom");
            });
            navigate(`/room/${roomName}`);
        },
        [navigate]
    );

    const ChatRoomComponents = useMemo(() => {
        if (lastMessage === null) {
            return null;
        }
        console.log(lastMessage);
        return (
            <>
                {lastMessage.map((item, idx) => (
                    <ChatRoom onClick={onJoinRoom(item.user_model_id)} key={idx}>
                        <button>{item.lastmessage}</button>
                        <div>
                            <div>
                                <div> 2</div>
                            </div>
                            <span> {item.updatedAt}</span>
                        </div>
                    </ChatRoom>
                ))}
            </>
        );
    }, [lastMessage]);

    //   const ChatRoomComponents = useMemo(() => {
    //       if (lastMessage === null) {
    //           return null;
    //       }
    //       console.log(lastMessage);
    //       return (
    //           <>
    //               {lastMessage.map((item, idx) => (
    //                   <ChatRoom onClick={onJoinRoom(item.user_model_id)} key={idx}>
    //                       <button>{item.lastmessage}</button>
    //                       <div>
    //                           <div>
    //                               <div> 2</div>
    //                           </div>
    //                           <span> {item.updatedAt}</span>
    //                       </div>
    //                   </ChatRoom>
    //               ))}
    //           </>
    //       );
    //   }, [lastMessage]);

    const dateTime = (date: Date) => {
        const milliSeconds = Number(new Date()) - Number(date);
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const dateString = date.toLocaleDateString();
        return dateString;
    };
    return (
        <>
            <Head>
                <div>채팅방 목록</div>
                <button onClick={onCreateRoom}>채팅방 생성</button>
            </Head>
            {lastMessage && ChatRoomComponents}
        </>
    );
};
export default WaitingRoom;
