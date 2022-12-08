import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "@/api/chat";
import { Head, Table, ChatRoom } from "@/styles/chat/waiting-room.styles";
import { socket } from "@/components/chat/Chat";
import { recentlyMsgState } from "@/temp/ChatRecoil";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue, useRecoilState } from "recoil";
interface CreateRoomResponse {
    success: boolean;
    payload: string;
}

const WaitingRoom = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const [results, setResults] = useRecoilState(recentlyMsgState);
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

    useEffect(() => {
        // console.log(rooms, "room");
        const roomListHandler = (rooms: string[]) => {
            setRooms(rooms);
        };
        const createRoomHandler = (response: any) => {
            console.log(response.result);
            setLastMessage(response.result);
            // setRooms((prevRooms) => [...prevRooms, results?.result[0].user_model_id]);
            // setLastMessage((prevRooms) => [...prevRooms, response.result.lastmessage]);
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
        console.log(lastMessage);
        if (lastMessage === null) {
            return null;
        }

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
                <div>어어어ㅓㅓ</div>
            </>
        );
    }, [lastMessage]);

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
            {/* {rooms.map((room, index) => (
                <ChatRoom onClick={onJoinRoom(room)} key={index}>
                    <button>
                        {room}
                    </button>
                    <div>
                        <div>
                            <div> 1</div>
                        </div>
                        <span> 메세지가 온 날짜</span>
                    </div>
                </ChatRoom>
            ))} */}
            {/* {Object.entries(results?.result).map((room: any, index: any) => (
                <ChatRoom onClick={onJoinRoom(room)} key={index}>
                    <button>{room.lastmessage}</button>
                    <div>
                        <div>
                            <div> 1</div>
                        </div>
                        <span> 메세지가 온 날짜</span>
                    </div>
                </ChatRoom>
            ))} */}
            {/* {lastMessage.map((room, index) => (
                <ChatRoom onClick={onJoinRoom(room)} key={room}>
                    <button>{room}</button>
                    <div>
                        <div>
                            <div> 2</div>
                        </div>
                        <span> 메세지가 온 날짜</span>
                    </div>
                </ChatRoom>
            ))} */}
            {/* <Table>
                <thead>
                    <tr>
                        <th>방번호</th>
                        <th>방이름</th>
                        <th>입장</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        // <tr key={room}>
                        //     <td>{index + 1}</td>
                        //     <td>{room}</td>
                        //     <td>
                        //         <button onClick={onJoinRoom(room)}>입장하기</button>
                        //     </td>
                        // </tr>
                        // <ChatRoom />
                    ))}
                </tbody>
            </Table> */}
        </>
    );
};
export default WaitingRoom;
