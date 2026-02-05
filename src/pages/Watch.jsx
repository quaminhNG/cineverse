import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { TMDB_IMAGE_BASE_URL } from "../services/tmdb";
import MovieRow from "../components/MovieRow";
import requests from "../services/requests";

const Watch = () => {
  const location = useLocation();
  const movie = {
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    rating: 9.0,
    year: "2016",
    duration: "45m",
    cast: ["Winona Ryder", "David Harbour", "Finn Wolfhard"],
    tags: ["Sci-Fi", "Horror", "Mystery"],
    backdrop_path: "/56v2KjBlU4XaOv9rVYkJu64HIIV.jpg"
  };

  const episodes = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Chapter ${i + 1}: The Vanishing`,
    duration: "48m",
    image: `https://picsum.photos/300/170?random=${i}`
  }));

  const recommendations = Array.from({ length: 6 }, (_, i) => ({
    title: `Similar Movie ${i + 1}`,
    image: `https://picsum.photos/300/450?random=${i + 10}`
  }));
  const isPoster = true;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
      <div className="flex items-center gap-4 px-6 md:px-12 py-5 sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <Link
          to="/"
          className="p-2 rounded-full hover:bg-white/10 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:-translate-x-1 transition-all"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-lg md:text-xl font-bold truncate text-gray-100">
          Watching: <span className="text-cineverse-cyan">{movie.title}</span> - S1:E1
        </h1>
      </div>


      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mt-6">
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(74,107,255,0.15)] ring-1 ring-white/10 relative group">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/xcJtL7QggTI?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {movie.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
              <span className="flex items-center gap-1 text-green-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                {movie.rating} Rating
              </span>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span className="border border-gray-600 px-2 rounded text-xs py-0.5">{movie.tags[0]}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300 p-2">
              {movie.cast.map((actor, idx) => (
                <button
                  key={idx}
                  className="w-12 h-12 rounded-full ring-[#0a0a0a] overflow-hidden relative transform transition-all duration-300 hover:scale-110 hover:z-10 hover:ring-cineverse-cyan hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] group"
                  title={actor}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${actor}&background=random&color=fff`}
                    alt={actor}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              <button className="w-12 h-12 rounded-full bg-gray-800 ring-[#0a0a0a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:ring-cineverse-cyan hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] z-0 hover:z-10 text-xs font-bold">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-10 px-6 md:px-12 max-w-[1600px] mx-auto mt-6">
        <div className="absolute"></div>
        <div className="w-full md:w-1/2 flex flex-col justify-start gap-4 text-gray-300">
          <div className="">
            <h1>Đây là đoạn văn bản mẫu dùng để hiển thị tạm thời nội dung trong khi dữ liệu chính thức đang được cập nhật. Văn bản này giúp bạn hình dung bố cục, khoảng cách và cách trình bày tổng thể của giao diện. Nội dung thực tế sẽ được thay thế sau khi hoàn thiện.</h1>
            <h1>Đây là đoạn văn bản mẫu dùng để hiển thị tạm thời nội dung trong khi dữ liệu chính thức đang được cập nhật. Văn bản này giúp bạn hình dung bố cục, khoảng cách và cách trình bày tổng thể của giao diện. Nội dung thực tế sẽ được thay thế sau khi hoàn thiện.</h1>
            <h1>Đây là đoạn văn bản mẫu dùng để hiển thị tạm thời nội dung trong khi dữ liệu chính thức đang được cập nhật. Văn bản này giúp bạn hình dung bố cục, khoảng cách và cách trình bày tổng thể của giao diện. Nội dung thực tế sẽ được thay thế sau khi hoàn thiện.</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold mb-4">Season</h1>
              <div className="flex flex-row justify-between">
                <button className="bg-cineverse-cyan text-black px-6 py-2 font-bold transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">Season 1</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold mb-4">Episode</h1>
              <div className="flex flex-row gap-4 flex-wrap">
                <button className="bg-cineverse-gradient text-black font-bold px-5 py-3 rounded-full transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">1</button>
                <button className="bg-cineverse-gradient text-black font-bold px-5 py-3 rounded-full transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">2</button>
                <button className="bg-cineverse-gradient text-black font-bold px-5 py-3 rounded-full transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">3</button>
                <button className="bg-cineverse-gradient text-black font-bold px-5 py-3 rounded-full transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">4</button>
                <button className="bg-cineverse-gradient text-black font-bold px-5 py-3 rounded-full transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">5</button>
                <button className="bg-cineverse-gradient text-black font-bold px-5 py-3 rounded-full transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(143,239,255,0.5)]">6</button>
              </div>
            </div>
          </div>

          {/* Trailers & Extras Section - Placeholder to fill space */}
          <div className="mt-8 border-t border-white/10 pt-8">
            <h1 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-8 bg-cineverse-cyan rounded-full"></span>
              Trailers & Extras
            </h1>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center group cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-all">
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                  <img src="https://picsum.photos/300/170?random=100" alt="Trailer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center transition-all backdrop-blur-[1px] group-hover:backdrop-blur-none">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-cineverse-cyan group-hover:text-black group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-white font-bold text-lg group-hover:text-cineverse-cyan transition-colors line-clamp-1">Official Trailer: Main Event</span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300">2m 45s • YouTube</span>
                </div>
              </div>

              <div className="flex gap-4 items-center group cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-all">
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                  <img src="https://picsum.photos/300/170?random=101" alt="Teaser" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center transition-all backdrop-blur-[1px] group-hover:backdrop-blur-none">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-cineverse-cyan group-hover:text-black group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-white font-bold text-lg group-hover:text-cineverse-cyan transition-colors line-clamp-1">Teaser: The Beginning</span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300">1m 12s • YouTube</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={isPoster ? "https://picsum.photos/400/600" : "https://picsum.photos/800/450"}
            alt="Movie Content"
            className={`rounded-xl shadow-2xl ${isPoster ? 'w-2/3 aspect-[2/3] object-cover' : 'w-full aspect-video object-cover'}`}
          />
        </div>
      </div>
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mt-6">
        <MovieRow title="Related Movies" fetchUrl={requests.fetchActionMovies} isPoster={true} />
        <MovieRow fetchUrl={requests.fetchActionMovies} isPoster={false} />
      </div>
    </div>
  );
};

export default Watch;