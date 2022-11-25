import { Wrapper, Main } from "@/styles/home/page-style";
import IntroduceFirstPage from "@/components/introduce/introduceFirstPage";
import IntroduceSecondPage from "@/components/introduce/introduceSecondPage";
import { useRef, useState, useEffect } from "react";

const introduce = () => {
    const [ani, setAni] = useState(true);
    const section = useRef<HTMLDivElement>(null);
    const [resizeHeight, setResizeHeight] = useState(window.innerHeight);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!ani) {
            return;
        }
        if (e.deltaY < 0) {
            //scroll up function

            if (section.current == null) {
                return;
            }
            section.current.style.transition = "all 0.7s";
            // !== 가 아닌 != 은 null 과 undefined 다 체크해줌
            let top = Number(section.current.style.top.replace("px", ""));

            const height = Number(-innerHeight * 5);

            if (0 >= top && top >= height) {
                setInnerHeight((prev) => prev++);
                section.current.style.top = `${top + innerHeight}px`;

                setTimeout(() => {
                    setAni(true);
                }, 800);

                setAni(false);

                changeSideNavStyle();

                // if (!navRefs.current) {
                //     return;
                // }
            }

            if (top === 0) {
                section.current.style.top = 0 + "px";
            }
        } else {
            //scroll down function
            if (section.current == null) {
                return;
            }
            section.current.style.transition = "all 0.7s";

            let top = Number(section.current.style.top.replace("px", ""));

            const height = Number(-innerHeight * 5);
            if (0 >= top || top <= height) {
                setInnerHeight((prev) => prev--);
                section.current.style.top = `${top - innerHeight}px`;

                setTimeout(() => {
                    setAni(true);
                }, 800);
                setAni(false);

                // changeSideNavStyle();

                const scrollPosition = Math.abs(
                    Number(section.current.style.top.replace("px", "")) / innerHeight
                );
            }

            if (top === Number(-innerHeight * 4)) {
                section.current.style.top = `-${innerHeight * 4}px`;
            }
        }
    };
    const changeSideNavStyle = () => {
        //no scroll function
        if (section.current == null) {
            return;
        }
        let top = Number(section.current.style.top.replace("px", ""));

        const pureTop = Math.abs(top);
        const navIndex = pureTop / innerHeight;

        // for (let i = 0; i < 5; i++) {
        //     if (!navRefs.current) {
        //         return;
        //     }
        //     navRefs.current[i].style.backgroundColor = "#fff";
        //     navRefs.current[i].style.color = "#000";
        //     navRefs.current[i].style.fontSize = "14px";
        //     navRefs.current[i].style.width = "95px";
        //     navRefs.current[i].style.padding = "5px";
        //     navRefs.current[i].style.border = "1px solid #868686";
        // }

        // if (navIndex < 5) {
        //     if (!navRefs.current) {
        //         return;
        //     }
        //     navRefs.current[navIndex].style.backgroundColor = "#000";
        //     navRefs.current[navIndex].style.color = "#fff";
        //     navRefs.current[navIndex].style.fontSize = "18px";
        //     navRefs.current[navIndex].style.width = "125px";
        //     navRefs.current[navIndex].style.padding = "5px";
        //     navRefs.current[navIndex].style.border = "1px solid #000";
        // }
    };

    useEffect(() => {
        const resetHeight = () => {
            if (section.current == null) {
                return;
            }

            const scrollPosition = Math.abs(
                Number(section.current.style.top.replace("px", "")) / innerHeight
            );

            for (let i = 0; i < 6; i++) {
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
        <>
            <Wrapper>
                <Main>
                    <div onWheel={onWheel} ref={section}>
                        <IntroduceFirstPage />
                    </div>
                    <div>
                        <IntroduceSecondPage />
                    </div>
                </Main>
            </Wrapper>
        </>
    );
};

export default introduce;
