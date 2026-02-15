import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import requests from "../services/requests";

const NewPopular = () => {
    const randomPoster = () => Math.random() > 0.5;

    return (
        <div className="w-full min-h-screen pb-20 bg-cineverse-dark">
            <HeroBanner fetchUrl={requests.fetchTrending} />
            <div className="pt-10 px-8 md:px-16 flex flex-col gap-8">
                <MovieRow title="New & Popular" fetchUrl={requests.fetchTrending} isPoster={true} />
                <MovieRow title="Top 10 Today" fetchUrl={requests.fetchTrending} isPoster={randomPoster()} />
                <MovieRow title="Coming Soon" fetchUrl={requests.fetchTrending} isPoster={randomPoster()} />
            </div>
        </div>
    );
};

export default NewPopular;
