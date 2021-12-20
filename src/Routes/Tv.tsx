import { useQuery } from "react-query";
import styled from "styled-components";
import {
	getOnTheAirTv,
	getAiringTodayTv,
	getPopularTv,
	getTopRatedTv,
	IGetTvsResult,
} from "../api";
import BicBanner from "../Components/BicBanner";
import Slider from "../Components/Slider";

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
	const { data: onData, isLoading: onLoading } = useQuery<IGetTvsResult>(["tv", "onTheAir"], getOnTheAirTv);
	const { data: airData, isLoading: airLoading } = useQuery<IGetTvsResult>(["tv", "airingToday"], getAiringTodayTv);
	const { data: popuarData, isLoading: popuarLoading } = useQuery<IGetTvsResult>(["tv", "popular"], getPopularTv);
	const { data: topData, isLoading: topLoading } = useQuery<IGetTvsResult>(["tv", "topRated"], getTopRatedTv);
	return (
		<Wrapper>
			{onLoading ? (<Loader>Loading...</Loader>
			) : (
				<>
					<BicBanner data={onData?.results[0]} />
					<SliderContainer>
						<Slider data={onData} infoName="on" routeName="tv" />
						{popuarLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={popuarData} infoName="popular" routeName="tv" />
						)}
						{airLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={airData} infoName="air" routeName="tv" />
						)}
						{topLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={topData} infoName="top" routeName="tv" />
						)}
					</SliderContainer>
				</>
			)}
		</Wrapper>
	);
}

export default Tv;