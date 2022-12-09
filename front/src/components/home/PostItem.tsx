import { useState, forwardRef, useMemo, useCallback, useRef, ForwardedRef } from "react";
import { CardSection, Post, PostDetail, MessageBlock } from "@/styles/home/postList-style";
import { socket } from "@/components/chat/Chat";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue } from "recoil";
interface Items {
    id: number;
    title: string;
    description: string;
    emotion: string;
    createdAt: Date;
    user_model_id: number;
}

interface Props {
    post: Items;
}

interface CreateRoomResponse {
    success: boolean;
    payload: string;
}

function PostItem({ post }: Props, ref: ForwardedRef<HTMLElement>) {
    const [isOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState(false);
    const { id, emotion, title, description, createdAt, user_model_id } = post;
    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);
    const messegeRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const onToggle = () => {
        setLike((prev) => !prev);
    };

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

    const onCreateRoom = useCallback(() => {
        const messege = messegeRef.current?.value;
        let inviter = String(user?.id); //자기자신
        let invitee = String(user_model_id);

        if (user_model_id === Number(user?.id)) {
            // console.log("자기자신에게 메세지를 보낸경우");
            return;
        }
        // if (!roomName) return alert("방 이름은 반드시 입력해야 합니다.");

        socket.emit("create-room", inviter, invitee, messege, (response: CreateRoomResponse) => {
            if (!response.success) return alert(response.payload);

            navigate(`/room/${response.payload}`);
        });
    }, [navigate]);

    const nowDate = dateTime(new Date(createdAt));

    const itemBody = useMemo(() => {
        return (
            <>
                <Post onClick={onClick} isOpen={isOpen} emotion={emotion}>
                    <span className="emotion">{id}</span>
                    <span className="title">{title}</span>
                    <div className="time">
                        <span>{nowDate}</span>
                        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                    </div>
                </Post>
                {isOpen && (
                    <PostDetail>
                        <p className="description">{description}</p>
                        <div>
                            <MessageBlock>
                                <input
                                    type="text"
                                    placeholder="메시지는 익명으로 전송됩니다. 속마음을 나눠보세요!"
                                    autoFocus
                                    ref={messegeRef}
                                />
                                <button onClick={onCreateRoom} className="submitButton">
                                    전송
                                </button>
                            </MessageBlock>
                            <button
                                className={like ? "material-icons" : "material-symbols-outlined"}
                                onClick={onToggle}
                            >
                                thumb_up
                            </button>
                        </div>
                    </PostDetail>
                )}
            </>
        );
    }, [isOpen, like, post]);

    return ref ? (
        <CardSection ref={ref}>{itemBody}</CardSection>
    ) : (
        <CardSection>{itemBody}</CardSection>
    );
}

export default forwardRef(PostItem);
