import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "@/api/chat";
import { Head, Table, ChatRoom } from "@/styles/chat/waiting-room.styles";
import { socket } from "@/components/chat/Chat";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue } from "recoil";
interface CreateRoomResponse {
    success: boolean;
    payload: string;
}

interface Items {
    id: number;
    user_model_id: string;
}

const WaitingRoom = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);

    useEffect(() => {
        const roomListHandler = (rooms: string[]) => {
            setRooms(rooms);
        };
        const createRoomHandler = (newRoom: string) => {
            setRooms((prevRooms) => [...prevRooms, newRoom]);
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

    return (
        <>
            <Head>
                <div>채팅방 목록</div>
                <button onClick={onCreateRoom}>채팅방 생성</button>
            </Head>

            {rooms.map((room, index) => (
                <ChatRoom onClick={onJoinRoom(room)}>
                    <button>{room}</button>
                    <div>
                        <div>
                            <div> 1</div>
                        </div>
                        <span> 메세지가 온 날짜</span>
                    </div>
                </ChatRoom>
            ))}
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
