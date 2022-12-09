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
    const [count, setCount] = useState();
    const [chatList, setChatList] = useState<
        | {
              updatedAt: string;
              user_model_id: string;
              lastmessage: string;
              count: string;
          }[]
        | null
    >(null);

    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);
    const setrecentMessage = useSetRecoilState(recentlyMsgState);
    const userid = String(user?.id);

    console.log(chatList, "chatList");

    useEffect(() => {
        // socket handler
        navigate(`/room/`);
        const roomListHandler = (rooms: string[]) => {};

        const createRoomHandler = (response: any) => {
            setChatList(response.result);
            console.log(chatList, "create chatList");
        };
        const deleteRoomHandler = (roomName: string) => {
            setRooms((prevRooms) => prevRooms.filter((room) => room !== roomName));
        };

        socket.emit("room-list", String(user?.id), roomListHandler);

        socket.on("create-room", createRoomHandler);
        socket.on("delete-room", deleteRoomHandler);

        return () => {
            socket.off("room-list", roomListHandler);
            socket.off("create-room", createRoomHandler);
            socket.off("delete-room", deleteRoomHandler);
        };
    }, []);

    useEffect(() => {
        // socket handler

        const messageHandler = (chat: ChatData) => {
            console.log("chat", chat, chatList);
            setrecentMessage({
                sender: chat.sender,
                msgText: chat.msgText,
            });

            if (chatList !== null) {
                setChatList((prev) => {
                    return prev!.map((item) => {
                        if (item.user_model_id == chat.roomName) {
                            item.lastmessage = chat.msgText;
                            item.updatedAt = "방금 전";
                        }
                        return item;
                    });
                });
            }
        };
        socket.on("message", messageHandler);
        return () => {
            socket.off("message", messageHandler);
        };
    }, [chatList]);

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
            socket.emit("join-room", roomName, user?.id, () => {
                console.log(roomName, "joinroom");
            });
            getMessegetext(roomName, userid);
            navigate(`/room/${roomName}`);
        },
        [navigate]
    );

    const getMessegetext = async (
        roomName: string,
        userid: string
    ): Promise<JSX.Element[] | JSX.Element | undefined> => {
        try {
            const { data } = await api.getCountMessege(roomName, userid);
            setCount(data.result);
            console.log(count, roomName, userid);
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    const ChatRoomComponents = useMemo(() => {
        if (chatList === null) {
            return null;
        }
        console.log("chatList", chatList);
        return (
            <>
                {chatList.map((item, idx) => (
                    <ChatRoom onClick={onJoinRoom(item.user_model_id)} key={idx}>
                        <button>{item.lastmessage}</button>
                        <div>
                            <div>{count}</div>
                            <span> {item.updatedAt}</span>
                        </div>
                    </ChatRoom>
                ))}
            </>
        );
    }, [chatList]);

    return (
        <>
            <Head>
                <div>채팅방 목록</div>
                <button onClick={onCreateRoom}>채팅방 생성</button>
            </Head>
            {chatList && ChatRoomComponents}
        </>
    );
};

export default WaitingRoom;
