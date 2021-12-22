import { useQuery } from "react-query";
import styled from "styled-components";
import {
	getNowMovies,
	getPopularMovies,
	getTopMovies,
	getUpCmingMovies
} from "../api";
import BicBanner from "../Components/BicBanner";
import Slider from "../Components/Slider";
import { IGetApiDataResult } from "../types";
import { sliderTitleFind } from "../utils";
import { useMatch } from "react-router-dom";
import MovieDetail from "../Components/MovieDetail";

const Wrapper = styled.div`
	background: black;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	height:20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SliderContainer = styled.div`
	position: relative;
	top: -180px;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

function Home() {
	const { data: nowData, isLoading: nowLoading } = useQuery<IGetApiDataResult>(["movies", "nowPlaying"], getNowMovies);
	const { data: popuarData, isLoading: popuarLoading } = useQuery<IGetApiDataResult>(["movie", "popular"], getPopularMovies);
	const { data: topData, isLoading: topLoading } = useQuery<IGetApiDataResult>(["movie", "top"], getTopMovies);
	const { data: upData, isLoading: upLoading } = useQuery<IGetApiDataResult>(["movie", "up"], getUpCmingMovies);
	const bigMovieMatch = useMatch(`/movies/:movieId`);
	return (
		<Wrapper>
			{nowLoading ? (<Loader>Loading...</Loader>
			) : (
				<>
					<BicBanner data={nowData?.results[0]} />
					<SliderContainer>
						<Slider data={nowData} dataName={sliderTitleFind("now")} />
						{popuarLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={popuarData} dataName={sliderTitleFind("popular")} />
						)}
						{topLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={topData} dataName={sliderTitleFind("top")} />
						)}
						{upLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={upData} dataName={sliderTitleFind("up")} />
						)}
					</SliderContainer>
					{bigMovieMatch ? (
						<MovieDetail />
					) : null}
				</>
			)}
		</Wrapper>
	);
}

export default Home;