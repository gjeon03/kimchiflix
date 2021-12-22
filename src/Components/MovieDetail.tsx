import styled from "styled-components";
import { motion, useViewportScroll, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import {
	getMovieDetail,
	getSimilarMovies,
} from "../api";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IDetail, ISimilar } from "../types";
import { useEffect } from "react";
import { layoutIdState } from "../atoms";
import { useRecoilValue } from "recoil";

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
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	width: 70vw;
	height: 960px;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	top: 0;
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

const OriginalTitle = styled.div`
	height: 20px;
`;

const BigTitle = styled.h3`
	font-size: 46px;
	position: relative;
`;

const Details = styled.div`
	display: flex;
	margin-left: 20px;
	position: relative;
	top: -60px;
	font-weight: 400;
`;

const DetailSpan = styled.span`
	margin-right: 10px;
	margin-left: 10px;
`;

const BigOverview = styled.p`
	height: 120px;
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
	background-position: center center;
	background-size: 100% 100%;
	cursor: pointer;
	margin-bottom: 10px;
`;

function MovieDetail() {
	const url = useLocation().pathname.split("/");
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	const { data: detailData, isLoading: detailLoading, refetch: detailRefetch } = useQuery<IDetail>("detail", () => {
		return getMovieDetail(url[2] as string) as any;
	});
	const { data: similarData, isLoading: similarLoading, refetch: similarRefetch } = useQuery<ISimilar>("similar", () => {
		return getSimilarMovies(url[2] as string) as any;
	});
	const navigate = useNavigate();
	const { scrollY } = useViewportScroll();
	const onOverlayClick = () => navigate(`/${url[1] !== "movies" ?
		url[1] + "?keyword=" + keyword : ""}`);
	const onSimilarClick = (movieId: number) => navigate(`/${url[1] !== "movies" ?
		url[1] + "/" + movieId + "/movie?keyword=" + keyword : url[1] + "/" + movieId}`);
	useEffect(() => {
		detailRefetch();
		similarRefetch();
	}, [location]);
	const layoutId = useRecoilValue(layoutIdState);
	return (
		<AnimatePresence>
			<>
				<Overlay
					onClick={onOverlayClick}
					exit={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				/>
				<BigMovie
					style={{ top: scrollY.get() + 70 }}
					layoutId={layoutId}
				>
					{detailLoading ? (<Loader>Loading...</Loader>
					) : (
						<DetailContainer>
							<BigCover
								bgphoto={makeImagePath(detailData?.backdrop_path || "")}
							/>
							<TitleBox>
								<BigTitle>{detailData?.title || ""}</BigTitle>
								<OriginalTitle>{detailData?.original_title}</OriginalTitle>
							</TitleBox>
							<Details>
								<DetailSpan>{detailData?.release_date || ""}</DetailSpan>
								<DetailSpan>{detailData?.runtime} min</DetailSpan>
								<div>
									{detailData?.genres.map((item, index) => {
										if (index === 0) {
											return <span key={index}>{item.name}</span>
										}
										return <span key={index}>/{item.name}</span>
									})}
								</div>
								<DetailSpan>⭐️{detailData?.vote_average}/10</DetailSpan>
							</Details>
							<BigOverview>{detailData?.overview}</BigOverview>
							<Companies>
								<span>제작사</span>
								<div>
									{detailData?.production_companies.map((item, index) => {
										if (!item.logo_path) return;
										return <CompaniesLogo key={index} bgphoto={makeImagePath(item.logo_path || "")} />
									})}
								</div>
							</Companies>
							<SimilarContainer>
								<h3>Similar Movies</h3>
								<Poster>
									{similarLoading ? (<Loader>Loading...</Loader>
									) : (
										<>
											{similarData?.results.slice(0, 6).map((item, index) => {
												return (
													<div key={index}>
														<Similar
															key={item.id}
															onClick={() => onSimilarClick(item.id)}
															bgphoto={makeImagePath(item.poster_path, "w300")}
														/>
														<span key={index}>{item.title}</span>
													</div>
												);
											})}
										</>
									)}
								</Poster>
							</SimilarContainer>
						</DetailContainer>
					)}
				</BigMovie>
			</>
		</AnimatePresence>
	);
}

export default MovieDetail;