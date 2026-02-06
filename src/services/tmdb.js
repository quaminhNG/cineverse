import axios from 'axios';
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});
export const TMDB_IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original/";
export const TMDB_IMAGE_W500_URL = "https://image.tmdb.org/t/p/w500/";

export default instance;