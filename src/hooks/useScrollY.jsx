import { useEffect, useState, useRef } from "react";

export default function useScrollY(threshold = 10) {
    const [scrolled, setScrolled] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            // Dùng requestAnimationFrame để throttle scroll event,
            // tránh setState quá nhiều lần trong mỗi frame
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setScrolled(window.scrollY > threshold);
                rafRef.current = null;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [threshold]);

    return scrolled;
}
