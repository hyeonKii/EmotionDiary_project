import { useRef, useState, useEffect, WheelEvent } from "react";

import IntroduceFirstPage from "@/components/introduce/introduceFirstPage";
import IntroduceSecondPage from "@/components/introduce/introduceSecondPage";
import { Main } from "@/styles/intro/page-style";

const introduce = () => {
    const section = useRef<HTMLDivElement | null>(null);
    const [resizeHeight, setResizeHeight] = useState(window.innerHeight);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        if (section.current == null) return;

        if (e.deltaY < 0) {
            if (section.current == null) return;
            section.current.style.transition = "all 0.7s";

            const top = Number(section.current.style.top.replace("px", ""));
            const height = Number(-innerHeight * 1);

            if (0 >= top && top >= height) {
                setInnerHeight((prev) => prev++);
                section.current.style.top = `${top + innerHeight}px`;

                changeSideNavStyle();
            }

            if (top === 0) section.current.style.top = 0 + "px";
        } else {
            if (section.current == null) return;
            section.current.style.transition = "all 0.7s";

            const top = Number(section.current.style.top.replace("px", ""));
            const height = Number(-innerHeight * 1);

            if (0 >= top || top <= height) {
                setInnerHeight((prev) => prev--);
                section.current.style.top = `${top - innerHeight}px`;
            }

            if (top === Number(-innerHeight * 1)) {
                section.current.style.top = `-${innerHeight * 1}px`;
            }
        }
    };
    const changeSideNavStyle = () => {
        if (section.current == null) return;
        const top = Number(section.current.style.top.replace("px", ""));
    };

    useEffect(() => {
        const resetHeight = () => {
            if (section.current == null) {
                return;
            }

            const scrollPosition = Math.abs(
                Number(section.current.style.top.replace("px", "")) / innerHeight
            );

            for (let i = 0; i < 3; i++) {
                if (scrollPosition === i) {
                    setInnerHeight((prev) => {
                        return (prev = resizeHeight);
                    });
                    section.current.style.top = `-${resizeHeight * i}px`;
                }
            }
        };

        resetHeight();

        const handleResize = () => {
            if (section.current == null) {
                return;
            }
            setResizeHeight(window.innerHeight);
            resetHeight();
            section.current.style.transition = "none";
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [resizeHeight, innerHeight]);

    return (
        <Main onWheel={onWheel} ref={section}>
            <IntroduceFirstPage />
            <IntroduceSecondPage />
        </Main>
    );
};

export default introduce;
