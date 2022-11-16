import { useState, useRef, useCallback } from "react";

export default function useTimer(time: number = 1000) {
    const [timedOut, setTimedOut] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const timerOn = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            setTimedOut(false);
        }

        timerRef.current = setTimeout(() => {
            setTimedOut(true);
        }, time);
    }, []);

    return { timerOn, timedOut };
}
