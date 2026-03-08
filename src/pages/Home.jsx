import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import MovieShowcase from "../components/movie/MovieShowcase";
import requests from "../services/requests";
import SpotlightGrid from "../components/movie/SpotlightGrid";

const Home = () => {
  const randomPoster = () => Math.random() > 0.5;

  return (
    <div className="w-full min-h-screen pb-20 bg-cineverse-dark">
      <HeroBanner />
      <div className="pt-10 px-8 md:px-16">
        <SpotlightGrid />
        <MovieRow
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
          isPoster={false}
        />
        <MovieShowcase />
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
    </div>
  );
};

export default Home;
