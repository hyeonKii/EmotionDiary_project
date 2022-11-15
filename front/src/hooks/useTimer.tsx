import { useRef, useCallback } from "react";

export default function useTimer(time: number = 1000) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const timerOn = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        timerRef.current = setTimeout(() => {}, time);
    }, []);

    return { timerOn };
}
