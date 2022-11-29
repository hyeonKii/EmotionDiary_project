import { useState } from "react";
import { TabList } from "@/styles/common/tab-style";
import { DiarySection } from "@/styles/diary/diary-style";
import { TodayDiary } from "./TodayDiary";

const tabList = ["하루일기", "전체일기", "대화목록"];

export function Diary() {
    const [tab, setTab] = useState("하루일기");

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
            {tab === "하루일기" && <TodayDiary />}
        </DiarySection>
    );
}
