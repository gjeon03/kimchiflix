const API_KEY = "f5fe15e46c765a1c3bf914a1973efc89";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE_PATH = "language=ko";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	adult: boolean
	genre_ids: []
	original_language: string
	original_title: string
	popularity: 10213.258
	release_date: string
	video: false
	vote_average: number
	vote_count: number
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getNowMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getPopularMovies() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getTopMovies() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getUpCmingMovies() {
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getMovieDetail(movieId:string) {
	return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getVideos(movieId:string) {
	return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getSimilarMovies(movieId:string) {
	return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}