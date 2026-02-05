import MovieRow from "../components/MovieRow";
import MoviesHot from "../components/MoviesHot";
import CineverseSpecial from "../components/CineverseSpecial";
import { useEffect } from "react";
import axios from "../services/tmdb";
import requests from "../services/requests";

const Home = () => {
  const randomPoster = () => Math.random() > 0.5;
  return (
    <div className="w-full min-h-screen pt-10 px-8 md:px-16 pb-20">
      <MoviesHot />
      <CineverseSpecial />
      <div className="flex flex-col gap-4 md:gap-8 pb-20 w-full px-0">
        <MovieRow
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isPoster={true}
        />
        <MovieRow
          title="Xu hướng hiện nay"
          fetchUrl={requests.fetchTrending}
          isPoster={randomPoster()}
        />

        <MovieRow
          title="Được đánh giá cao"
          fetchUrl={requests.fetchTopRated}
          isPoster={randomPoster()}
        />
        <MovieRow title="Phim Hành động" fetchUrl={requests.fetchActionMovies} isPoster={randomPoster()} />
        <MovieRow title="Phim Hài" fetchUrl={requests.fetchComedyMovies} isPoster={randomPoster()} />
        <MovieRow title="Phim Kinh dị" fetchUrl={requests.fetchHorrorMovies} isPoster={randomPoster()} />
        <MovieRow title="Phim Lãng mạn" fetchUrl={requests.fetchRomanceMovies} isPoster={randomPoster()} />
      </div>
    </div>
  );
};
export default Home;
