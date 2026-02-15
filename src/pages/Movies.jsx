import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import requests from "../services/requests";

const Movies = () => {
    const randomPoster = () => Math.random() > 0.5;

    return (
        <div className="w-full min-h-screen pb-20 bg-cineverse-dark">
            <HeroBanner fetchUrl={requests.fetchTrending} />
            <div className="pt-10 px-8 md:px-16 flex flex-col gap-8">
                <MovieRow title="Trending Movies" fetchUrl={requests.fetchTrending} isPoster={true} />
                <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} isPoster={randomPoster()} />
                <MovieRow title="Action" fetchUrl={requests.fetchActionMovies} isPoster={randomPoster()} />
                <MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} isPoster={randomPoster()} />
                <MovieRow title="Horror" fetchUrl={requests.fetchHorrorMovies} isPoster={randomPoster()} />
                <MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} isPoster={randomPoster()} />
                <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} isPoster={randomPoster()} />
            </div>
        </div>
    );
};

export default Movies;
