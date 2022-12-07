import { useState } from "react";
import { TabList } from "@/styles/common/tab-style";
import { DiarySection } from "@/styles/diary/diary-style";
import { DiaryCalendar } from "./DiaryCalendar";
import { Chat } from "@/components/chat/Chat";
import DiaryUserPostList from "./DiaryUserPostList";

const tabList = ["하루일기", "전체일기", "대화목록"] as const;
type TabList = typeof tabList[number];

export function Diary() {
    const [tab, setTab] = useState<TabList>("하루일기");

    return (
        <DiarySection>
            <TabList>
                {tabList?.map((tabName) => (
                    <li
                        key={tabName}
                        className={tab === tabName ? "active" : undefined}
                        onClick={() => setTab(tabName)}
                    >
                        {tabName}
                    </li>
                ))}
            </TabList>
            {tab === "하루일기" && <DiaryCalendar />}
            {tab === "전체일기" && <DiaryUserPostList />}
            {tab === "대화목록" && <Chat />}
        </DiarySection>
    );
}
