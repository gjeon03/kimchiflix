import styled from "styled-components";
import React from "react";
import { motion, useViewportScroll } from "framer-motion";
import {
	getMovieDetail,
	getSimilarMovies,
} from "../api";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IDetail, ISimilar } from "../types";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	width: 70vw;
	height: 150vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const BigCover = styled.div<{ bgphoto: string }>`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 300px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
`;

const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.white.lighter};
	padding-left: 20px;
	position: relative;
	top: -90px;
	div:last-child {
		font-size: 20px;
	}
`;

const BigTitle = styled.h3`
	font-size: 46px;
	position: relative;
`;

const Details = styled.div`
	display: grid;
	margin-left: 20px;
	position: relative;
	top: -60px;
	grid-template-columns: 1fr 1fr 2fr 1fr 2fr;
	font-weight: 400;
`;

const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -60px;
	color: ${(props) => props.theme.white.lighter};
`;

const Companies = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	span {
		font-weight: 400;
		font-size: 20px;
		margin-bottom: 10px;
	}
	div {
		display:grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))
	}
`;

const CompaniesLogo = styled.div<{ bgphoto: string }>`
	width: 100px;
	height: 50px;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	background-size: 100% 100%;
`;

const SimilarContainer = styled.div`
	margin: 30px 20px;
	h3 {
		font-weight: 400;
		font-size: 20px;
		margin-bottom: 10px;
	}
`;

const Poster = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	span {
		font-weight: 400;
		font-size: 16px;
	}
`;

const Similar = styled.div<{ bgphoto: string }>`
	height: 200px;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	background-size: 100% 100%;
	cursor: pointer;
	margin-bottom: 10px;
`;

interface IProps {
	id?: string;
};

function Detail({ id }: IProps) {
	const detail = useQuery<IDetail>("detail", () => getMovieDetail(id as string) as any);
	const similar = useQuery<ISimilar>("similar", () => getSimilarMovies(id as string) as any);
	const navigate = useNavigate();
	const { scrollY } = useViewportScroll();
	const onOverlayClick = () => navigate("/");
	const onSimilarClick = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	}
	console.log(similar);
	return (
		<>
			<Overlay
				onClick={onOverlayClick}
				exit={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			/>
			<BigMovie
				style={{ top: scrollY.get() - 400 }}
			>
				{detail ? (
					<DetailContainer>
						<BigCover
							bgphoto={makeImagePath(detail.data?.backdrop_path || "")}
						/>
						<TitleBox>
							<BigTitle>{detail.data?.title}</BigTitle>
							<div>{detail.data?.original_title}</div>
						</TitleBox>
						<Details>
							<span>{detail.data?.release_date}</span>
							<span>{detail.data?.runtime} min</span>
							<div>
								{detail.data?.genres.map((item, index) => {
									if (index === 0) {
										return <span key={index}>{item.name}</span>
									}
									return <span key={index}>/{item.name}</span>
								})}
							</div>
							<span>⭐️{detail.data?.vote_average}/10</span>
						</Details>
						<BigOverview>{detail.data?.overview}</BigOverview>
						<Companies>
							<span>제작사</span>
							<div>
								{detail.data?.production_companies.map((item, index) => {
									return <CompaniesLogo key={index} bgphoto={makeImagePath(item.logo_path || "")} />
								})}
							</div>
						</Companies>
						<SimilarContainer>
							<h3>유사한 영화</h3>
							<Poster>
								{similar.data?.results.map((item, index) => {
									if (index > 5) return;
									return (
										<div>
											<Similar
												onClick={() => onSimilarClick(item.id)}
												bgphoto={makeImagePath(item.poster_path, "w300")}
											/>
											<span>{item.title}</span>
										</div>
									);
								})}
							</Poster>
						</SimilarContainer>
					</DetailContainer>
				) : (<Loader>Loading...</Loader>)}
			</BigMovie>
		</>
	);
}

export default React.memo(Detail);