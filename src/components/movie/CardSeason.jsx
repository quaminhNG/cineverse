const CardSeason = ({ image, title, season, isVertical = false }) => {
    return (
        <div className={`relative overflow-hidden rounded-xl group cursor-pointer border border-white/10 hover:border-cineverse-cyan/50 transition-all duration-300 shadow-lg ${isVertical ? 'aspect-[2/3] w-48' : 'aspect-video w-64'}`}>
            <div className="absolute inset-0">
                <img
                    src={image || "https://picsum.photos/400/600"}
                    alt={season}
                    className="w-full h-full object-cover blur-[2px] scale-105 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-cineverse-cyan transition-colors duration-300">
                    {season || "Season 1"}
                </h3>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-tr from-cineverse-cyan/10 to-transparent" />
        </div>
    );
};

export default CardSeason;