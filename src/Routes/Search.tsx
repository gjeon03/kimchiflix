import { useLocation } from "react-router";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieSearch, getTvSearch } from "../api";
import BicBanner from "../Components/BicBanner";
import Slider from "../Components/Slider";
import { IGetApiDataResult } from "../types";
import { useMatch } from "react-router-dom";
import MovieDetail from "../Components/MovieDetail";
import TvDetail from "../Components/TvDetail";
import Loader from "../Components/Loader";
import {
	Wrapper,
	SliderContainer,
} from "../Styles/route";

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	const { data: movieData, isLoading: movieLoading } = useQuery<IGetApiDataResult>(["search", "movies"], () => getMovieSearch(keyword as string) as any);
	const { data: tvData, isLoading: tvLoading } = useQuery<IGetApiDataResult>(["search", "tv"], () => getTvSearch(keyword as string) as any);
	const bigMovieMatch = useMatch(`/search/:movieId/movie`);
	const bigTvMatch = useMatch(`/search/:movieId/tv`);
	const loading = movieLoading || tvLoading;
	return (
		<Wrapper>
			{movieLoading ? (<Loader />
			) : (
				<>
					{loading ? (<Loader />
					) : (
						<BicBanner data={movieData ? movieData?.results[0] : tvData?.results[0]} />
					)}
					<SliderContainer>
						{movieLoading ? (<Loader />
						) : (
							<Slider data={movieData} dataName={"Movies"} />
						)}
						{tvLoading ? (<Loader />
						) : (
							<Slider data={tvData} dataName={"TvShows"} />
						)}
					</SliderContainer>
					{bigMovieMatch ? (
						<MovieDetail />
					) : null}
					{bigTvMatch ? (
						<TvDetail />
					) : null}
				</>
			)}
		</Wrapper>
	);
}
export default Search;