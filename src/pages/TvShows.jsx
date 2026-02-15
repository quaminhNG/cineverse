import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import requests from "../services/requests";

const TvShows = () => {
    const randomPoster = () => Math.random() > 0.5;

    return (
        <div className="w-full min-h-screen pb-20 bg-cineverse-dark">
            <HeroBanner fetchUrl={requests.fetchTVTrending} />
            <div className="pt-10 px-8 md:px-16 flex flex-col gap-8">
                <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isPoster={true} />
                <MovieRow title="Trending TV" fetchUrl={requests.fetchTVTrending} isPoster={randomPoster()} />
                <MovieRow title="Top Rated TV" fetchUrl={requests.fetchTVTopRated} isPoster={randomPoster()} />
                <MovieRow title="Action & Adventure" fetchUrl={requests.fetchTVActionAdventure} isPoster={randomPoster()} />
                <MovieRow title="Comedy" fetchUrl={requests.fetchTVComedy} isPoster={randomPoster()} />
                <MovieRow title="Crime" fetchUrl={requests.fetchTVCrime} isPoster={randomPoster()} />
                <MovieRow title="Drama" fetchUrl={requests.fetchTVDrama} isPoster={randomPoster()} />
                <MovieRow title="Sci-Fi & Fantasy" fetchUrl={requests.fetchTVSciFiFantasy} isPoster={randomPoster()} />
                <MovieRow title="Family" fetchUrl={requests.fetchTVFamily} isPoster={randomPoster()} />
                <MovieRow title="Kids" fetchUrl={requests.fetchTVKids} isPoster={randomPoster()} />
                <MovieRow title="Mystery" fetchUrl={requests.fetchTVMystery} isPoster={randomPoster()} />
                <MovieRow title="Reality" fetchUrl={requests.fetchTVReality} isPoster={randomPoster()} />
            </div>
        </div>
    );
};

export default TvShows;
