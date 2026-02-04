const WatchedCard = ({
    episode = 1,
    title = "Peaky Blinders",
    duration = "55m",
    image = "/src/assets/images/hero-banner.png",
    progress = 75
}) => {
    return (
        <div className="min-w-[210px] flex-shrink-0 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden">
                <img
                    src={image}
                    alt={`Episode ${episode}`}
                    className="w-52 h-28 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg hover:bg-cineverse-main transition-colors duration-200 hover:shadow-[0_0_28px_rgba(95,179,255,0.7)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>


                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600/50">
                    <div
                        className="h-full bg-gradient-to-r from-cineverse-cyan to-cineverse-deep rounded-r-full shadow-[0_0_8px_rgba(143,239,255,0.6)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-2">
                <p className="text-white text-sm font-medium">
                    Ep {episode}: {title}
                </p>
                <p className="text-white/60 text-xs">{duration}</p>
            </div>
        </div>
    );
};

export default WatchedCard;
