const API_KEY = "f5fe15e46c765a1c3bf914a1973efc89";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE_PATH = "language=ko-Kore_KR";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
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

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${LANGUAGE_PATH}`).then(
		(response) => response.json()
	);
}