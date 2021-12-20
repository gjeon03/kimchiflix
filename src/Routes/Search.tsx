import { useLocation } from "react-router";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
	IGetSearchResult,
	getSearch,
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

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	const { data: data1, isLoading: isLoading1 } = useQuery<IGetSearchResult>(["search", "1"], () => getSearch(keyword as string, "1") as any);
	return (
		<Wrapper>
			{isLoading1 ? (<Loader>Loading...</Loader>
			) : (
				<>
					<BicBanner
						data={data1?.results[0]}
						releaseDate={data1?.results[0].release_date ? data1?.results[0].release_date : data1?.results[0].first_air_date}
						routeName={data1?.results[0].media_type === "movie" ? "movies" : "tv"}
					/>
					<SliderContainer>
						<Slider data={data1} infoName="now" routeName="search" />
					</SliderContainer>
				</>
			)}
		</Wrapper>
	);
}
export default Search;