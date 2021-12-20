const API_KEY = "f5fe15e46c765a1c3bf914a1973efc89";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE_PATH = "language=ko";

// Movie

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	release_date: string,
	vote_average: number,
	name: string,
	media_type: string,
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

// Tv

export interface ITv {
	id: number;
	backdrop_path: string;
	poster_path: string;
	name: string;
	overview: string;
	first_air_date: string,
	vote_average: number,
	title: string,
	media_type: string,
}

export interface IGetTvsResult {
	page: number;
	results: ITv[];
}

export function getOnTheAirTv() {
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getAiringTodayTv() {
	return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getPopularTv() {
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getTopRatedTv() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

// Search

export interface ISearch {
	id: number;
	backdrop_path: string;
	poster_path: string;
	name: string;
	overview: string;
	first_air_date: string,
	vote_average: number,
	title: string,
	media_type: string,
	release_date: string,
}

export interface IGetSearchResult {
	page: number;
	results: ISearch[];
}

export function getSearch(keyword:string, page:string) {
	return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&${LANGUAGE_PATH}&query=${keyword}&page=${page}&include_adult=false`).then(
		(response) => response.json()
	);
}