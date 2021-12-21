const API_KEY = "f5fe15e46c765a1c3bf914a1973efc89";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE_PATH = "language=ko";

// Movie

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

export function getDetailTv() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getTvDetail(movieId:string) {
	return fetch(`${BASE_PATH}/tv/${movieId}?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

export function getSimilarTvs(movieId:string) {
	return fetch(`${BASE_PATH}/tv/${movieId}/similar?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}

// Search

export function getMovieSearch(keyword:string) {
	return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&${LANGUAGE_PATH}&query=${keyword}&include_adult=false`).then(
		(response) => response.json()
	);
}

export function getTvSearch(keyword:string) {
	return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&${LANGUAGE_PATH}&query=${keyword}&include_adult=false`).then(
		(response) => response.json()
	);
}