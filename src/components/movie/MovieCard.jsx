import { useState } from "react";

const MovieCard = ({ image, title }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full h-full rounded-none overflow-hidden group cursor-pointer shadow-lg bg-black">
      {/* Skeleton placeholder hiện khi ảnh đang tải */}
      {!imgLoaded && !imgError && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}

      {/* Fallback khi ảnh lỗi */}
      {imgError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.5-4.5M15 10l-4.5 4.5M15 10H9m6 0L9 4.5M9 10l-4.5 4.5" />
            <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1} />
          </svg>
        </div>
      )}

      <img
        src={image}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setImgLoaded(true)}
        onError={() => { setImgError(true); setImgLoaded(true); }}
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