import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "@/api/chat";
import { Head, Table, ChatRoomstyle } from "@/styles/chat/waiting-room.styles";
import { socket } from "@/components/chat/Chat";
import { recentlyMsgState, ChatListForm, currentroom } from "@/temp/ChatRecoil";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

interface CreateRoomResponse {
    success: boolean;
    payload: string;
}

interface ChatData {
    sender: string;
    msgText: string;
    chatRoom: string;
}
interface ChatList {
    updatedAt: string;
    user_model_id: string;
    lastmessage: string;
    count: string;
}

const WaitingRoom = (prop: { chatList: ChatListForm | null }) => {
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
    const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    // const setrecentMessage = useSetRecoilState(recentlyMsgState);
    const userid = String(user?.id);
    const [recentMessage, setRecentMessage] = useRecoilState(recentlyMsgState);
    useEffect(() => {
        // socket handler
        const roomListHandler = (rooms: string[]) => {
            // getMessegetext(rooms[0], userid);
        };
        const createRoomHandler = (response: any, usermodel: string) => {
            response.result.map(async (item: ChatList, index: number) => {
                const countresult = await api.getCountMessege(item.user_model_id, userid);
                response.result[index]["count"] = countresult.data.result;
            });
            if (userid == usermodel) {
                setChatList(response.result);
            }
        };

        //방 목록 불러오기
        socket.emit("room-list", String(user?.id), roomListHandler);

        socket.on("create-room", createRoomHandler);

        return () => {
            socket.off("room-list", roomListHandler);
            socket.off("create-room", createRoomHandler);
        };
        // const deleteRoomHandler = (roomName: string) => {};
        // socket.on("delete-room", deleteRoomHandler);
        // socket.off("delete-room", deleteRoomHandler);
    }, [recentMessage]);

    useEffect(() => {
        navigate(`/`);
        socket.emit("join-room", "", user?.id, () => {});
    }, []);

    // }, [recentMessage]);

    useEffect(() => {
        // socket handler

        const messageHandler = (chat: ChatData) => {
            // console.log("chat", chat, chatList, 42342342343);
            console.log("working");
            setRecentMessage({
                sender: chat.sender,
                msgText: chat.msgText,
                chatRoom: chat.chatRoom,
            });
            console.log("chatlist 갱신");
            if (chatList !== null) {
                console.log("count");
                chatList.map(async (item: ChatList, index: number) => {
                    const countresult = await api.getCountMessege(item.user_model_id, userid);
                    chatList[index]["count"] = countresult.data.result;
                });
            }

            setChatList((prev) => {
                console.log(prev, "ㄷㄱㅎㄱ");
                return prev!.map((item) => {
                    if (item.user_model_id == chat.chatRoom) {
                        console.log("update");
                        item.lastmessage = chat.msgText;
                        item.updatedAt = "방금 전";
                        item.count = item.count + 1;
                    }
                    return item;
                });
            });
            // }
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
            // onLeaveRoom(roomName);
            socket.emit("join-room", roomName, user?.id, () => {});
            socket.emit("leave-room", roomName, () => {});
            navigate(`/room/${roomName}`);
            setCurrentsroom(roomName);
            return () => {};
        },
        [navigate]
    );
    const onLeaveRoom = (roomName: string) => {
        socket.emit("leave-room", roomName, () => {});
        setCurrentsroom(roomName);
        // navigate("/");
    };

    const ChatRoomComponents = useMemo(() => {
        if (chatList === null) {
            return null;
        }
        // console.log("chatList", chatList);
        return (
            <>
                {chatList.map((item, idx) => (
                    <ChatRoomstyle onClick={onJoinRoom(item.user_model_id)} key={idx}>
                        <button>{item.lastmessage}</button>
                        <div>
                            <div>{item.count}</div>
                            <span> {item.updatedAt}</span>
                        </div>
                        {/* <button>{item.lastmessage}</button> */}
                    </ChatRoomstyle>
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
            {prop.chatList && ChatRoomComponents}
        </>
    );
};

export default WaitingRoom;
