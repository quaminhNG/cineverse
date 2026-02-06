import { useState } from "react";

const MovieCard = ({ image, title }) => {
  return (
    <div className="relative w-full h-full rounded-none overflow-hidden group cursor-pointer shadow-lg bg-black">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <div className="absolute inset-[-1px] bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 pointer-events-none" />

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
        </div>
      </div>
    </div>
  );
};

export default MovieCard;