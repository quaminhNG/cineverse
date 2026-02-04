const MovieCard = ({
  image = "/src/assets/images/hero-banner.png",
  title = "Movie Title",
  genre = "Action",
  year = "2024"
}) => {
  return (
    <div className="relative w-full h-full rounded-none overflow-hidden group cursor-pointer shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

      <div className="absolute top-3 left-3">
        <h5 className="text-[10px] md:text-xs font-extrabold tracking-widest text-transparent bg-clip-text bg-cineverse-gradient drop-shadow-md opacity-90 transition-all duration-500 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(143,239,255,0.8)]">
          CINEVERSE
        </h5>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
        <div className="w-[3px] h-8 bg-gradient-to-b from-cineverse-cyan to-cineverse-deep shadow-[0_0_10px_rgba(143,239,255,0.6)] shrink-0 rounded-full" />

        <div className="flex flex-col justify-center text-white overflow-hidden">
          <h3 className="text-base md:text-lg font-bold leading-tight tracking-wide truncate">
            {title}
          </h3>
          <p className="text-[10px] md:text-xs font-medium text-gray-300 flex items-center gap-2 truncate">
            <span>{year}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>{genre}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;