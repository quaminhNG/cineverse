import MovieRow from "../components/movie/MovieRow";
import MoviesHot from "../components/movie/MoviesHot";
import CineverseSpecial from "../components/movie/CineverseSpecial";
import requests from "../services/requests";
import AnimationRow from "../components/movie/AnimationRow";
const Home = () => {
  const randomPoster = () => Math.random() > 0.5;
  return (
    <div className="w-full min-h-screen pt-10 px-8 md:px-16 pb-20">
      <AnimationRow />
      <MoviesHot />
      <CineverseSpecial />
      <div className="flex flex-col gap-4 md:gap-8 pb-20 w-full px-0">
        <MovieRow
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isPoster={true}
        />
        <MovieRow
          title="Trending"
          fetchUrl={requests.fetchTrending}
          isPoster={randomPoster()}
        />

        <MovieRow
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
          isPoster={randomPoster()}
        />
        <MovieRow title="Action" fetchUrl={requests.fetchActionMovies} isPoster={randomPoster()} />
        <MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} isPoster={randomPoster()} />
        <MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} isPoster={randomPoster()} />
        <MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} isPoster={randomPoster()} />
      </div>
    </div>
  );
};
export default Home;
