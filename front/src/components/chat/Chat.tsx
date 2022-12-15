import { Container, FlexBox } from "@/styles/chat/chat-style";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState, useMemo } from "react";
import { currentUser } from "@/temp/userAtom";
import * as api from "@/api/chat";
import { Head, ChatRoomstyle } from "@/styles/chat/waiting-room.styles";
import { recentlyMsgState } from "@/temp/ChatRecoil";
import { useRecoilValue, useRecoilState } from "recoil";
import ChatRoom from "@/components/chat/chatroom";
// export const socket = io("http://localhost:3002");
import { currentroom } from "@/temp/ChatRecoil";

export const socket = io("http://kdt-ai5-team02.elicecoding.com");

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
    const [joinedRoom, setJoinedRoom] = useState<string>();
    const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    let { roomName } = useParams<"roomName">();
    // const [currentsroom, setCurrentsroom] = useRecoilState(currentroom);
    const user = useRecoilValue(currentUser);
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
    useEffect(() => {
        //메세지 헨들러가 2개?

        const leaveRoomHandler = (roomName: string) => {
            setCurrentsroom(roomName);
        };

        const createRoomHandler = async (response: any, usermodel: string) => {
            //로그인한 사용자의 읽지 않은 메세지를 구해 채팅방 목록에 count 추가
            if (userid == usermodel) {
                const a = await Promise.all(
                    response.result.map(async (item: ChatList, index: number) => {
                        const countresult = await api.getCountMessege(item.user_model_id, userid);
                        response.result[index]["count"] = countresult.data.result;
                    })
                );
                setChatList(response.result);
            }
        };

        const messageHandler = async (chat: ChatData) => {
            setRecentMessage({
                sender: chat.sender,
                msgText: chat.msgText,
                chatRoom: chat.chatRoom,
            });

            //메세지를 보냈을때 채팅방 목록에 있는 count 값 0으로
            setChatList((prev) => {
                return prev!.map((item) => {
                    if (item.user_model_id == chat.chatRoom) {
                        item.lastmessage = chat.msgText;
                        item.updatedAt = "방금 전";
                        if (chat.sender == userid) {
                            item.count = "0";
                        }
                        item.count = item.count;
                    }
                    return item;
                });
            });
        };
        // 클라이언트단에서 소켓으로 때리는 함수
        socket.emit("room-list", String(user?.id), () => {}, []);

        //소켓에서 클라이언트단으로 때리는 함수
        socket.on("leave-room", leaveRoomHandler);
        socket.on("message", messageHandler);
        socket.on("create-room", createRoomHandler);
        return () => {
            socket.off("leave-room", leaveRoomHandler);
            socket.off("message", messageHandler);
            socket.off("create-room", createRoomHandler);
        };
    }, []);

    //채팅방값 감시
    useEffect(() => {
        const messageHandler = (chat: ChatData) => {
            setRecentMessage({
                sender: chat.sender,
                msgText: chat.msgText,
                chatRoom: chat.chatRoom,
            });

            setChatList((prev) => {
                return prev!.map((item) => {
                    if (item.user_model_id == chat.chatRoom) {
                        item.lastmessage = chat.msgText;
                        item.updatedAt = "방금 전";
                        if (chat.sender == userid) {
                            item.count = "0";
                        } else {
                            item.count = String(Number(item.count) + 1);
                        }
                    }
                    return item;
                });
            });
        };
        socket.on("message", messageHandler);
        return () => {
            socket.off("message", messageHandler);
        };
    }, [chatList]);

    const setCountZero = (roomName: string) => {
        setChatList((prev) => {
            return prev!.map((item) => {
                //배열의 방과 선택한 방의 값이 같을 경우 0으로 set
                if (item.user_model_id == roomName) item.count = "0";
                return item;
            });
        });
    };
    const onJoinRoom = useCallback(
        (roomName: string) => async () => {
            socket.emit("join-room", roomName, user?.id, () => {});
            socket.emit("leave-room", roomName, () => {});
            setCountZero(roomName);
            await api.readMessege(roomName, userid);
            setCurrentsroom(roomName);
            setJoinedRoom(roomName);
            return () => {};
        },
        [navigate]
    );
    const ChatRoomComponents = useMemo(() => {
        if (chatList === null) {
            return null;
        }
        return (
            <>
                {chatList.map((item, idx) => (
                    <ChatRoomstyle onClick={onJoinRoom(item.user_model_id)} key={idx}>
                        <button>{item.lastmessage}</button>
                        <div>
                            {Number(item.count) == 0 ? "" : <div>{item.count}</div>}
                            <span> {item.updatedAt}</span>
                        </div>
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
                        <Head>
                            <div>채팅방 목록</div>
                            <button onClick={onCreateRoom}>채팅방 생성</button>
                        </Head>
                        {chatList && ChatRoomComponents}
                    </Container>
                </span>
                <Container>
                    {joinedRoom && (
                        <ChatRoom
                            joinedRoom={joinedRoom}
                            setJoinedRoom={setJoinedRoom}
                            focusEvent={() => setCountZero(roomName!)}
                        />
                    )}
                </Container>
            </FlexBox>
        </>
    );
}
