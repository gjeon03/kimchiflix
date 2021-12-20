import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import BicBanner from "../Components/BicBanner";

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

const Row = (motion.div);
const Overlay = styled.div``;
const Slider = styled.div``;
const Box = styled(motion.div) <{ bgPhoto: string }>``;
const Info = styled(motion.div)``;
const BicMovie = styled.div``;
const BicCover = styled.div``;
const BicTitle = styled.h3``;
const BigOverview = styled.p``;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const offset = 6;

function Home() {
	const navigate = useNavigate();
	const bigMovieMatch = useMatch("/movies/:movieId");
	const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
	const [leaving, setLeaving] = useState(false);
	const [index, setIndex] = useState(0);
	const incraseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};
	const onOverlayClick = () => navigate("/");
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find((movie) => String(movie.id) === bigMovieMatch.params.movieId);
	return (
		<Wrapper>
			{isLoading ? (<Loader>Loading...</Loader>
			) : (
				<>
					<BicBanner data={data?.results[0]} />
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											whileHover="hover"
											initial="normal"
											variants={boxVariants}
											onClick={() => onBoxClicked(movie.id)}
											transition={{ type: "tween" }}
											bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}

export default Home;