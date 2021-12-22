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
import { sliderTitleFind } from "../utils";
import Loader from "../Components/Loader";
import {
	Wrapper,
	SliderContainer,
} from "../Styles/route";

function Tv() {
	const { data: onData, isLoading: onLoading } = useQuery<IGetApiDataResult>(["tv", "onTheAir"], getOnTheAirTv);
	const { data: airData, isLoading: airLoading } = useQuery<IGetApiDataResult>(["tv", "airingToday"], getAiringTodayTv);
	const { data: popuarData, isLoading: popuarLoading } = useQuery<IGetApiDataResult>(["tv", "popular"], getPopularTv);
	const { data: topData, isLoading: topLoading } = useQuery<IGetApiDataResult>(["tv", "topRated"], getTopRatedTv);
	const bigTvMatch = useMatch(`/tv/:movieId`);
	return (
		<Wrapper>
			{onLoading ? (<Loader />
			) : (
				<>
					<BicBanner data={onData?.results[0]} />
					<SliderContainer>
						<Slider data={onData} dataName={sliderTitleFind("on")} />
						{popuarLoading ? (<Loader />
						) : (
							<Slider data={popuarData} dataName={sliderTitleFind("popular")} />
						)}
						{airLoading ? (<Loader />
						) : (
							<Slider data={airData} dataName={sliderTitleFind("air")} />
						)}
						{topLoading ? (<Loader />
						) : (
							<Slider data={topData} dataName={sliderTitleFind("top")} />
						)}
					</SliderContainer>
					{bigTvMatch ? (
						<TvDetail />
					) : null}
				</>
			)}
		</Wrapper>
	);
}

export default Tv;