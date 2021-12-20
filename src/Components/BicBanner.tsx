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
`;

const Title = styled.div`
	font-size: 40px;
	font-weight: 400;
	margin-bottom: 30px;
`;

const Overview = styled.div`
	width:600px;
	font-size: 20px;
	font-weight: 350;
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
			<Overview>{data?.overview}</Overview>
		</Banner>
	);
}

export default BicBanner;