import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: top center;
`;

const Title = styled.div`
	font-size: 40px;
	font-weight: 400;
	margin-bottom: 25px;
`;

const Overview = styled.div`
	width:50%;
	font-size: 16px;
	font-weight: 350;
`;

const MovieInfo = styled.div`
	display: flex;
	padding:10px;
	font-weight:400;
	span:first-child{
		margin-right: 20px;
	}
`;

interface IProps {
	data?: IMovie;
};

function BicBanner({ data }: IProps) {
	return (
		<Banner
			bgPhoto={makeImagePath(data?.backdrop_path || "")}
		>
			<Title>{data?.title}</Title>
			<MovieInfo>
				<span>{data?.release_date}</span>
				<span>⭐️ {data?.vote_average} / 10</span>
			</MovieInfo>
			<Overview>{data?.overview}</Overview>
		</Banner>
	);
}

export default BicBanner;