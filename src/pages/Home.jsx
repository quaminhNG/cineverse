import MovieRow from "../components/MovieRow";
import MoviesHot from "../components/MoviesHot";
import { useEffect } from "react";
import axios from "../services/tmdb";
import requests from "../services/requests";

const Home = () => {
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      console.log("Dữ liệu phim về rồi nè:", request.data.results);
    }
    fetchData();
  }, [])
  return (
    <div className="w-full min-h-screen pt-10 px-8 md:px-16 pb-20">
      <MoviesHot />
      <div className="flex flex-col gap-8 pb-20 w-full px-0">
        <MovieRow title="Trending Now" />
        <MovieRow title="Top 10 Today" isVertical={true} />
      </div>
    </div>
  );
};
export default Home;
