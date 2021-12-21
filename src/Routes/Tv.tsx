import { useQuery } from "react-query";
import styled from "styled-components";
import {
	getOnTheAirTv,
	getAiringTodayTv,
	getPopularTv,
	getTopRatedTv,
} from "../api";
import BicBanner from "../Components/BicBanner";
import Slider from "../Components/Slider";
import { IGetApiDataResult } from "../types";
import { useMatch } from "react-router-dom";
import TvDetail from "../Components/TvDetail";

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

function Tv() {
	const { data: onData, isLoading: onLoading } = useQuery<IGetApiDataResult>(["tv", "onTheAir"], getOnTheAirTv);
	const { data: airData, isLoading: airLoading } = useQuery<IGetApiDataResult>(["tv", "airingToday"], getAiringTodayTv);
	const { data: popuarData, isLoading: popuarLoading } = useQuery<IGetApiDataResult>(["tv", "popular"], getPopularTv);
	const { data: topData, isLoading: topLoading } = useQuery<IGetApiDataResult>(["tv", "topRated"], getTopRatedTv);
	const bigTvMatch = useMatch(`/tv/:movieId`);
	console.log(bigTvMatch);
	return (
		<Wrapper>
			{onLoading ? (<Loader>Loading...</Loader>
			) : (
				<>
					<BicBanner data={onData?.results[0]} />
					<SliderContainer>
						<Slider data={onData} dataName="on" />
						{popuarLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={popuarData} dataName="popular" />
						)}
						{airLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={airData} dataName="air" />
						)}
						{topLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={topData} dataName="top" />
						)}
						{bigTvMatch ? (
							<TvDetail />
						) : null}
					</SliderContainer>
				</>
			)}
		</Wrapper>
	);
}

export default Tv;