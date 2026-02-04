import WatchedCard from "./WatchedCard";

const ContinueWatchingRow = () => {
    const episodes = [...Array(10)].map((_, index) => ({
        episode: index + 1,
        progress: Math.floor(Math.random() * 80) + 10,
    }));

    return (
        <div className="absolute bottom-10 left-0 w-full h-auto z-20">
            <div className="flex flex-col gap-2 px-8 md:px-16">
                <h3 className="text-white text-lg font-semibold">Continue Watching</h3>
                <div className="w-full min-w-0">
                    <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4 snap-x">
                        {episodes.map((ep, index) => (
                            <div key={index} className="snap-start">
                                <WatchedCard
                                    episode={ep.episode}
                                    progress={ep.progress}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContinueWatchingRow;
