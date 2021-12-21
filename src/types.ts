export interface IApiData {
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

export interface IGetApiDataResult{
	page: number;
	results: IApiData[];
}

interface IDtailGenres {
	id: number,
	name: string,
}

interface IDetailCompanies {
	id: number,
	logo_path: string,
	name: string,
	origin_country: string,
}

export interface IDetail {
	genres: IDtailGenres[],
	homepage: string,
	production_companies: IDetailCompanies[],
	runtime: number,
	backdrop_path: string,
	poster_path: string,
	release_date: string,
	vote_average: number,
	title:string,
	overview:string,
	original_title: string,
	name: string,
	first_air_date: string,
}

interface IVideosResults{
	so_639_1: string,
	iso_3166_1: string,
	name: string,
	key: string,
	site: string,
	size: number,
	type: string,
	official: boolean,
	id: string,
}

export interface IVideos {
	id: number,
	results: IVideosResults[],
}

export interface ISimilar {
	results: [{
		adult: boolean,
		backdrop_path: string,
		id: 335983,
		title: string,
		original_language: string,
		original_title: string,
		overview: string,
		popularity: number,
		poster_path: string,
		release_date: string,
		vote_average: number,
		name: string,
		first_air_date: string,
	}]
}