import { useEffect, useRef, useState } from "react";

export const useAnimatedValue = (initial, { duration = 300 } = {}) => {
    const [dest, setDest] = useState(initial);
    const [count, setCount] = useState(dest);
    const interval = useRef();
    useEffect(() => {
        if (count != dest) {
            const startTime = new Date().getTime();
            interval.current = setInterval(() => {
                const now = new Date().getTime();
                if (now < startTime + duration) {
                    setCount(Math.round(count + (dest - count) * (now - startTime) / duration))
                }
                else {
                    setCount(dest)
                    clearInterval(interval.current)
                    interval.current = null;
                }
            }, 50)
            return () => { if (interval.current) clearInterval(interval.current) }
        }
    }, [dest, duration])
    return [count, setDest];
}

export const camelToCapitalize = (camelCaseStr) => {
    return camelCaseStr
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
        .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
}

export const indexToShortWeekday = (ind) => {
    return ["Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"][ind]
};

export const indexToShortMonthName = (index) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[index];
};