import { useViewportScroll } from "framer-motion";
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
import Loader from "./Loader";
import {
	Overlay,
	BigMovie,
	DetailContainer,
	BigCover,
	TitleBox,
	OriginalTitle,
	BigTitle,
	Details,
	DetailSpan,
	BigOverview,
	Companies,
	CompaniesLogo,
	SimilarContainer,
	Poster,
	Similar
} from "../Styles/detail";

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
	}, [location, detailRefetch, similarRefetch]);
	const layoutId = useRecoilValue(layoutIdState);
	return (
		<>
			<Overlay
				onClick={onOverlayClick}
				exit={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				whileHover={{ zIndex: 5 }}
			/>
			<BigMovie
				style={{ top: scrollY.get() + 70 }}
				layoutId={layoutId}
			>
				{detailLoading ? (<Loader />
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
								{similarLoading ? (<Loader />
								) : (
									<>
										{similarData?.results.slice(0, 6).map((item, index) => {
											return (
												<div key={index}>
													<Similar
														key={item.id}
														onClick={() => onSimilarClick(item.id)}
														bgphoto={makeImagePath(item.poster_path, "w200")}
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
	);
}

export default MovieDetail;