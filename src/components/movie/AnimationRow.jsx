import { useEffect, useState } from "react";
import axios, { TMDB_IMAGE_BASE_URL } from "../../services/tmdb";
import requests from "../../services/requests";
import useMovieNavigation from "../../hooks/useMovieNavigation";

const AnimationRow = () => {
    const handleMovieClick = useMovieNavigation();
    const [rows, setRows] = useState({ row1: [], row2: [], row3: [] });
    const shuffle = (arr) => {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    };
    const duplicate = (arr) => [...arr, ...arr];
    useEffect(() => {
        async function fetchData() {
            try {
                const shuffledUrls = shuffle(Object.values(requests));
                const [url1, url2, url3] = shuffledUrls.slice(0, 3);
                const [res1, res2, res3] = await Promise.all([
                    axios.get(url1),
                    axios.get(url2),
                    axios.get(url3),
                ]);
                setRows({
                    row1: res1.data.results,
                    row2: res2.data.results,
                    row3: res3.data.results,
                });
            } catch (error) {
                console.error("Error", error);
            }
        }
        fetchData();
    }, []);

    if (rows.row1.length === 0) return null;
    return (
        <div className="flex flex-col gap-6 overflow-hidden py-10 relative -mx-8 md:-mx-16">
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 animate-scroll w-max">
                {duplicate(rows.row1).map((item, index) => (
                    <div key={`r1-${index}`} className="flex-shrink-0 cursor-pointer" onClick={() => handleMovieClick(item)}>
                        <img
                            src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                            alt={item.name || item.title}
                            className="w-32 h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-4 animate-scroll-reverse w-max -ml-[100%]">
                {duplicate(rows.row2).map((item, index) => (
                    <div key={`r2-${index}`} className="flex-shrink-0 cursor-pointer" onClick={() => handleMovieClick(item)}>
                        <img
                            src={`${TMDB_IMAGE_BASE_URL}${item.backdrop_path || item.poster_path}`}
                            alt={item.name || item.title}
                            className="w-64 h-36 object-cover rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-4 animate-scroll w-max">
                {duplicate(rows.row3).map((item, index) => (
                    <div key={`r3-${index}`} className="flex-shrink-0 cursor-pointer" onClick={() => handleMovieClick(item)}>
                        <img
                            src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                            alt={item.name || item.title}
                            className="w-32 h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AnimationRow;