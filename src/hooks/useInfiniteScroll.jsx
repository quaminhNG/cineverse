import { useRef, useState, useEffect } from "react";

const useInfiniteScroll = (items, options = {}) => {
    const { repeatCount = 30, bufferSets = 5 } = options;
    const totalItems = items.length * repeatCount;

    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(
        Math.floor(totalItems / 2)
    );

    const scrollToIndex = (index) => {
        const container = containerRef.current;
        if (!container) return;
        const item = container.children[index];
        if (!item) return;

        const containerCenter = container.offsetWidth / 2;
        const itemCenter = item.offsetWidth / 2;
        const scrollLeft = item.offsetLeft - containerCenter + itemCenter;

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const center = container.scrollLeft + container.offsetWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;
        const children = container.children;

        for (let i = 0; i < children.length; i++) {
            const item = children[i];
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(center - itemCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        const itemWidth = children[0].offsetWidth;
        const singleSetWidth = itemWidth * items.length;

        const leftThreshold = singleSetWidth * bufferSets;
        const rightThreshold = singleSetWidth * (repeatCount - bufferSets);

        const jumpSets = 10;
        const jumpOffset = singleSetWidth * jumpSets;

        if (container.scrollLeft < leftThreshold) {
            container.scrollLeft += jumpOffset;
        } else if (container.scrollLeft > rightThreshold) {
            container.scrollLeft -= jumpOffset;
        }

        setActiveIndex(closestIndex);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const item = container.children[activeIndex];
            if (!item) return;

            const containerCenter = container.offsetWidth / 2;
            const itemCenter = item.offsetWidth / 2;
            const scrollLeft = item.offsetLeft - containerCenter + itemCenter;

            container.scrollTo({
                left: scrollLeft,
                behavior: "auto",
            });
        }
    }, []);

    return {
        containerRef,
        activeIndex,
        setActiveIndex,
        scrollToIndex,
        handleScroll,
        totalItems,
    };
};

export default useInfiniteScroll;
