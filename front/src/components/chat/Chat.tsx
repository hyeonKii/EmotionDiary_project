import { Container, FlexBox } from "@/styles/chat/chat-style";
import { io } from "socket.io-client";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { currentUser } from "@/temp/userAtom";
import * as api from "@/api/chat";
import { Head, ChatRoomstyle } from "@/styles/chat/waiting-room.styles";
import { recentlyMsgState } from "@/temp/ChatRecoil";
import { useRecoilValue, useRecoilState } from "recoil";
import ChatRoom from "@/components/chat/chatroom";
import WaitingRoom from "@/components/chat/waiting-room";
export const socket = io("http://localhost:4000");
import { currentroom, chatListState } from "@/temp/ChatRecoil";
//채팅 상자
interface ChatData {
    sender: string;
    msgText: string;
    chatRoom: string;
}
interface CreateRoomResponse {
    success: boolean;
    payload: string;
}
//채팅방 목록
interface ChatList {
    updatedAt: string;
    user_model_id: string;
    lastmessage: string;
    count: string;
}

export function Chat() {
    const [chats, setChats] = useState<ChatData[]>([]);
    const [joinedRoom, setJoinedRoom] = useState<string>();
    const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    const chatContainerEl = useRef<HTMLDivElement>(null);
    let { roomName } = useParams<"roomName">();
    const chatRoom = roomName;
    let { room } = useParams();
    // const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    const user = useRecoilValue(currentUser);
    const current_room = useRecoilValue(currentroom);
    const userid = String(user?.id);
    const [recentMessage, setRecentMessage] = useRecoilState(recentlyMsgState);
    // const [chatList, setChatList] = useRecoilState(chatListState);

    const navigate = useNavigate();
    const [chatList, setChatList] = useState<
        | {
              updatedAt: string;
              user_model_id: string;
              lastmessage: string;
              count: string;
          }[]
        | null
    >(null);
    console.log(chatList, chats, recentMessage), 454545;
    useEffect(() => {
        //메세지 헨들러가 2개?

        const leaveRoomHandler = (roomName: string) => {
            setCurrentsroom(roomName);
        };
        const roomListHandler = (rooms: string[]) => {
            // getMessegetext(rooms[0], userid);
        };

        const createRoomHandler = (response: any, usermodel: string) => {
            response.result.map(async (item: any, index: number) => {
                const countresult = await api.getCountMessege(item.user_model_id, userid);
                response.result[index]["count"] = countresult.data.result;
            });
            console.log("createRoom response:", response.result);
            if (userid == usermodel) {
                setChatList(response.result);
            }
        };

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

        socket.emit("room-list", String(user?.id), () => {}, []);

        socket.on("leave-room", leaveRoomHandler);
        socket.on("message", messageHandler);
        socket.on("create-room", createRoomHandler);
        return () => {
            socket.off("leave-room", leaveRoomHandler);
            socket.off("message", messageHandler);
        };
    }, []);

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
            // if (chatList !== null) {
            //     console.log("count");
            //     chatList.map(async (item: ChatList, index: number) => {
            //         const countresult = await api.getCountMessege(item.user_model_id, userid);
            //         chatList[index]["count"] = countresult.data.result;
            //     });
            // }

            setChatList((prev) => {
                console.log(prev, "ㄷㄱㅎㄱ");
                return prev!.map((item) => {
                    if (item.user_model_id == chat.chatRoom) {
                        console.log("update");
                        item.lastmessage = chat.msgText;
                        item.updatedAt = "방금 전";
                        // item.count = item.count + 1;
                    }
                    console.log(prev, "변경 후");
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

    const onJoinRoom = useCallback(
        (roomName: string) => () => {
            // onLeaveRoom(roomName);
            socket.emit("join-room", roomName, user?.id, () => {});
            socket.emit("leave-room", roomName, () => {});
            // navigate(`/diary/room/${roomName}`);
            console.log(roomName, 24242);
            setCurrentsroom(roomName);
            setJoinedRoom(roomName);
            return () => {};
        },
        [navigate]
    );
    console.log(joinedRoom);
    const ChatRoomComponents = useMemo(() => {
        console.log("create", chatList);
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
                            {/* <div>{item.count}</div> */}
                            <span> {item.updatedAt}</span>
                        </div>
                        {/* <button>{item.lastmessage}</button> */}
                    </ChatRoomstyle>
                ))}
            </>
        );
    }, [chatList]);

    const onCreateRoom = useCallback(() => {
        const roomName = prompt("방 이름을 입력해 주세요.");
        if (!roomName) return alert("방 이름은 반드시 입력해야 합니다.");

        socket.emit("create-room", roomName, (response: CreateRoomResponse) => {
            if (!response.success) return alert(response.payload);

            navigate(`/room/${response.payload}`);
        });
    }, [navigate]);

    return (
        <>
            <FlexBox>
                <span>
                    <Container>
                        {/* <WaitingRoom chatList={chatList} setChatList={setChatList} /> */}
                        <>
                            <Head>
                                <div>채팅방 목록</div>
                                <button onClick={onCreateRoom}>채팅방 생성</button>
                            </Head>
                            {chatList && ChatRoomComponents}
                        </>
                    </Container>
                </span>
                <Container>
                    {joinedRoom && (
                        // <Routes>
                        //     <Route path="/room/:roomName" element={<ChatRoom />} />
                        // </Routes>
                        <ChatRoom joinedRoom={joinedRoom} setJoinedRoom={setJoinedRoom} />
                    )}
                </Container>
            </FlexBox>
        </>
    );
}
