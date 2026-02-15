const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchTVTrending: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchTVTopRated: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchTVActionAdventure: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchTVComedy: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchTVCrime: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
    fetchTVDrama: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
    fetchTVFamily: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
    fetchTVKids: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
    fetchTVMystery: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    fetchTVReality: `/discover/tv?api_key=${API_KEY}&with_genres=10764`,
    fetchTVSciFiFantasy: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
}

export default requests;    