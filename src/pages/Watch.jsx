import { Link, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import YouTube from "react-youtube";
import axios, { TMDB_IMAGE_W500_URL, TMDB_IMAGE_BASE_URL } from "../services/tmdb";
import MovieRow from "../components/movie/MovieRow";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// ─── Skeleton helper ──────────────────────────────────────────────────────────
const Sk = ({ className }) => (
  <div className={`bg-white/10 animate-pulse rounded-lg ${className}`} />
);

// ─── Format thời lượng ────────────────────────────────────────────────────────
const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const Watch = () => {
  const location = useLocation();
  const { movie: stateMovie, trailerId } = location.state || {};

  const isTV = stateMovie?.first_air_date !== undefined ||
    (stateMovie?.name !== undefined && !stateMovie?.title);
  const mediaType = isTV ? "tv" : "movie";

  // ── Fetch chi tiết từ TMDB sử dụng useQuery ────────────────────────────────
  const { data: details, isLoading: isDetailsLoading } = useQuery({
    queryKey: ["details", mediaType, stateMovie?.id],
    queryFn: async () => {
      const response = await axios.get(`/${mediaType}/${stateMovie.id}?api_key=${API_KEY}&language=en-US`);
      return response.data;
    },
    enabled: !!stateMovie?.id,
  });

  const { data: credits, isLoading: isCreditsLoading } = useQuery({
    queryKey: ["credits", mediaType, stateMovie?.id],
    queryFn: async () => {
      const response = await axios.get(`/${mediaType}/${stateMovie.id}/credits?api_key=${API_KEY}&language=en-US`);
      return response.data;
    },
    enabled: !!stateMovie?.id,
  });

  const loading = isDetailsLoading || isCreditsLoading;
  const [activeTab, setActiveTab] = useState("episodes");

  const relatedUrl = useMemo(() => {
    const firstGenreId = details?.genres?.[0]?.id;
    if (firstGenreId) {
      const type = mediaType === "movie" ? "movie" : "tv";
      return `/discover/${type}?api_key=${API_KEY}&with_genres=${firstGenreId}&language=en-US`;
    }
    return null;
  }, [details, mediaType]);

  // ── Data tổng hợp ──────────────────────────────────────────────────────────
  const movie = stateMovie || {};
  const title = details?.title || details?.name || movie.title || movie.name || "Unknown";
  const overview = details?.overview || movie.overview || "";
  const rating = details?.vote_average?.toFixed(1) || movie.vote_average?.toFixed(1) || "N/A";
  const year = (details?.release_date || details?.first_air_date ||
    movie.release_date || movie.first_air_date || "").substring(0, 4);
  const runtime = formatRuntime(details?.runtime || details?.episode_run_time?.[0]);
  const genres = details?.genres || [];
  const cast = credits?.cast?.slice(0, 8) || [];
  const posterPath = details?.poster_path || movie.poster_path;
  const backdropPath = details?.backdrop_path || movie.backdrop_path;
  const numSeasons = details?.number_of_seasons;
  const numEpisodes = details?.number_of_episodes;

  // ── Tabs ───────────────────────────────────────────────────────────────────
  const tabs = [
    { id: "episodes", label: isTV ? "Episodes" : "More Info" },
    { id: "cast", label: "Cast & Crew" },
    { id: "related", label: "Related" },
  ];

  const ytOpts = {
    height: "100%",
    width: "100%",
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-24">

      {/* ── Topbar ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-6 md:px-12 py-5 sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <Link
          to="/"
          className="p-2 rounded-full hover:bg-white/10 transition-colors group flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2.5} stroke="currentColor"
            className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:-translate-x-1 transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-base md:text-xl font-bold truncate text-gray-100">
          {loading
            ? <span className="inline-block w-48 h-5 bg-white/10 animate-pulse rounded" />
            : <>Watching: <span className="text-cineverse-cyan">{title}</span></>
          }
        </h1>
      </div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mt-6 space-y-8">

        {/* ── Video Player ───────────────────────────────────────────────── */}
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.1)] ring-1 ring-white/10 flex items-center justify-center">
          {trailerId ? (
            <YouTube videoId={trailerId} opts={ytOpts} className="w-full h-full" />
          ) : (
            <div className="relative w-full h-full">
              {backdropPath && (
                <img
                  src={`${TMDB_IMAGE_BASE_URL}${backdropPath}`}
                  alt={title}
                  className="w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-gray-500 font-semibold text-lg">No Trailer Available</p>
                <p className="text-gray-600 text-sm">We couldn't find a trailer for this title.</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Movie Info Header ───────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            {loading ? (
              <div className="w-40 md:w-52 aspect-[2/3] bg-white/10 animate-pulse rounded-xl" />
            ) : posterPath ? (
              <img
                src={`${TMDB_IMAGE_W500_URL}${posterPath}`}
                alt={title}
                className="w-40 md:w-52 aspect-[2/3] object-cover rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
                loading="eager"
              />
            ) : null}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1">
            {loading ? (
              <>
                <div className="h-8 w-3/4 bg-white/10 animate-pulse rounded-lg" />
                <div className="flex gap-3">
                  <div className="h-5 w-20 bg-white/10 animate-pulse rounded" />
                  <div className="h-5 w-16 bg-white/10 animate-pulse rounded" />
                  <div className="h-5 w-24 bg-white/10 animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
                  <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-white/10 animate-pulse rounded" />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {title}
                </h2>

                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm">
                  <span className="flex items-center gap-1 text-yellow-400 font-bold">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {rating}
                  </span>
                  <span className="text-white/30">•</span>
                  {year && <span className="text-gray-400">{year}</span>}
                  {runtime && <><span className="text-white/30">•</span><span className="text-gray-400">{runtime}</span></>}
                  {numSeasons && <><span className="text-white/30">•</span><span className="text-gray-400">{numSeasons} Season{numSeasons > 1 ? "s" : ""}</span></>}
                  {numEpisodes && <span className="text-gray-400">· {numEpisodes} eps</span>}
                  <span className="border border-white/20 px-2 py-0.5 rounded text-xs text-gray-400">
                    {movie.adult ? "18+" : "TV-14"}
                  </span>
                </div>

                {/* Genres */}
                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <span key={g.id}
                        className="px-3 py-1 rounded-full border border-cineverse-cyan/30 text-cineverse-cyan text-xs font-semibold bg-cineverse-cyan/5">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
                  {overview || "No description available."}
                </p>

                {/* TV: Created by */}
                {details?.created_by?.length > 0 && (
                  <p className="text-sm text-gray-500">
                    <span className="text-gray-400 font-semibold">Created by: </span>
                    {details.created_by.map((c) => c.name).join(", ")}
                  </p>
                )}
                {/* Studio */}
                {details?.production_companies?.length > 0 && (
                  <p className="text-sm text-gray-500">
                    <span className="text-gray-400 font-semibold">Studio: </span>
                    {details.production_companies.slice(0, 3).map((c) => c.name).join(", ")}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────────────────────── */}
        <div className="border-b border-white/10">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${activeTab === tab.id
                  ? "border-cineverse-cyan text-cineverse-cyan"
                  : "border-transparent text-gray-400 hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab: Episodes / More Info ───────────────────────────────────── */}
        {activeTab === "episodes" && (
          <div className="space-y-6">
            {isTV ? (
              <>
                {numSeasons && (
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: numSeasons }, (_, i) => i + 1).map((s) => (
                      <button key={s}
                        className="px-5 py-2 rounded-full text-sm font-bold bg-cineverse-cyan/10 border border-cineverse-cyan/30 text-cineverse-cyan hover:bg-cineverse-cyan hover:text-black transition-all duration-200">
                        Season {s}
                      </button>
                    ))}
                  </div>
                )}
                <p className="text-gray-500 text-sm italic">
                  Episode list requires a full account setup with TMDB season details.
                </p>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                {[
                  { label: "Original Title", value: details?.original_title || details?.original_name },
                  { label: "Status", value: details?.status },
                  { label: "Language", value: details?.original_language?.toUpperCase() },
                  { label: "Budget", value: details?.budget ? `$${details.budget.toLocaleString()}` : null },
                  { label: "Revenue", value: details?.revenue ? `$${details.revenue.toLocaleString()}` : null },
                  { label: "Tagline", value: details?.tagline },
                ].filter((i) => i.value).map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{label}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Cast & Crew ───────────────────────────────────────────── */}
        {activeTab === "cast" && (
          <div>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-3 w-16 bg-white/10 animate-pulse rounded" />
                    <div className="h-3 w-12 bg-white/10 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            ) : cast.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-cineverse-cyan transition-all duration-300 shadow-lg">
                      {actor.profile_path ? (
                        <img
                          src={`${TMDB_IMAGE_W500_URL}${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-2xl font-bold">
                          {actor.name?.[0]}
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-white text-xs font-semibold leading-tight group-hover:text-cineverse-cyan transition-colors line-clamp-2">
                        {actor.name}
                      </p>
                      <p className="text-gray-500 text-[10px] leading-tight line-clamp-1 mt-0.5">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No cast information available.</p>
            )}

            {/* Director */}
            {credits?.crew && (() => {
              const director = credits.crew.find((c) => c.job === "Director");
              if (!director) return null;
              return (
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Director</span>
                  <div className="flex items-center gap-3">
                    {director.profile_path && (
                      <img
                        src={`${TMDB_IMAGE_W500_URL}${director.profile_path}`}
                        alt={director.name}
                        className="w-10 h-10 rounded-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <span className="text-white font-semibold">{director.name}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── Tab: Related ───────────────────────────────────────────────── */}
        {activeTab === "related" && (
          <div>
            {relatedUrl ? (
              <>
                <MovieRow title={`More ${genres[0]?.name || ""}`} fetchUrl={relatedUrl} isPoster={true} />
                <MovieRow
                  title="Also Recommended"
                  fetchUrl={relatedUrl.replace("discover", "discover") + "&sort_by=vote_average.desc&vote_count.gte=100"}
                  isPoster={false}
                />
              </>
            ) : (
              <MovieRow
                title="You Might Also Like"
                fetchUrl={`/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`}
                isPoster={true}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Watch;