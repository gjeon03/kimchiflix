import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IGetMoviesResult } from "../api";
import { makeImagePath, sliderTitleFind } from "../utils";
import { useNavigate, useMatch } from "react-router-dom";

const SliderContent = styled.div`
	width: 100%;
	height: 100%;
	margin-bottom: 330px;
`;

const RowBox = styled.div`
	position: relative;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	width: 100%;
	position: absolute;
`;

const MoviesMove = styled.div`
	position:relative;
	z-index: 99;
`;

const SlicerTitle = styled.span`
	padding: 20px;
	font-size: 30px;
	font-weight: 400;
`;

const SliderLeftBox = styled(motion.div)`
	height:300px;
	position:absolute;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	left: 0;
`;

const SliderBtn = styled.svg`
	width: 25px;
	height: 100px;
`;

const SliderRightBox = styled(motion.div)`
	height:300px;
	position:absolute;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	right: 0;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 300px;
	font-size: 66px;
	cursor: pointer;
	width: 100%;
	display: flex;
	align-items: end;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	h3 {
		font-size: 18px;
	}
	span {
		font-size: 15px;
	}
	h3, span {
		text-align: center;
		font-weight:400;
	}
`;

const rowVariants = {
	hidden: (btnFlag: boolean) => ({
		x: btnFlag ? window.outerWidth + 5 : -window.outerWidth - 5,
	}),
	visible: {
		x: 0,
	},
	exit: (btnFlag: boolean) => ({
		x: btnFlag ? -window.outerWidth - 5 : window.outerWidth + 5,
	}),
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
		opacity: 0.8,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const sliderBtn = {
	visible: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: {
			delay: 0.3,
			duaration: 0.1,
			type: "tween",
		},
	},
};

interface IProps {
	data?: IGetMoviesResult;
	infoName?: string;
};

function Slider({ data, infoName }: IProps) {
	const [sliderTitle, setSliderTitle] = useState("");
	const [windowSize, setWindowSize] = useState<number | undefined>();
	useEffect(() => {
		function handleResize() {
			setWindowSize(
				window.innerWidth,
			);
		}
		window.addEventListener("resize", handleResize); handleResize();
		setSliderTitle(sliderTitleFind(infoName as string) as string);
	}, []);
	const [offset, setOffet] = useState(6);
	useEffect(() => {
		const tmp = Math.floor(window.innerWidth / 150);
		setOffet(tmp > 6 ? 6 : tmp);
	}, [windowSize])
	const navigate = useNavigate();
	const bigMovieMatch = useMatch("/movies/:movieId");
	const [leaving, setLeaving] = useState(false);
	const [index, setIndex] = useState(0);
	const [btnFlag, setBtnFlag] = useState(true);
	const incraseIndex = async (flag: boolean) => {
		await setBtnFlag(flag);
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			if (flag) {
				setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
			} else {
				setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
			}
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};
	return (
		<SliderContent>
			<SlicerTitle>{sliderTitle}</SlicerTitle>
			<MoviesMove>
				<SliderLeftBox
					onClick={() => incraseIndex(false)}
					variants={sliderBtn}
					whileHover="hover"
					animate="visible"
				>
					<SliderBtn
						xmlns="http://www.w3.org/2000/svg"
						width="1024"
						height="276.742"
						viewBox="0 0 320 512"
						fill="currentColor"
					>
						<path
							d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
						></path>
					</SliderBtn>
				</SliderLeftBox>
				<SliderRightBox
					onClick={() => incraseIndex(true)}
					variants={sliderBtn}
					whileHover="hover"
					animate="visible"
				>
					<SliderBtn
						xmlns="http://www.w3.org/2000/svg"
						width="1024"
						height="276.742"
						viewBox="0 0 320 512"
						fill="currentColor"
					>
						<path
							d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
						></path>
					</SliderBtn>
				</SliderRightBox>
			</MoviesMove>
			<RowBox>
				<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
					<Row
						variants={rowVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={{ type: "tween", duration: 1 }}
						key={index}
						custom={btnFlag}
					>
						{data?.results
							.slice(1)
							.slice(offset * index, offset * index + offset)
							.map((movie) => (
								<Box
									layoutId={movie.id + (infoName as "")}
									key={movie.id}
									whileHover="hover"
									initial="normal"
									variants={boxVariants}
									onClick={() => onBoxClicked(movie.id)}
									transition={{ type: "tween" }}
									bgphoto={makeImagePath(movie.poster_path, "w300")}
								>
									<Info variants={infoVariants}>
										<h3>{movie.title}</h3>
										<span>{movie.release_date}</span>
										<span>⭐️ {movie.vote_average} / 10</span>
									</Info>
								</Box>
							))}
					</Row>
				</AnimatePresence>
			</RowBox>
		</SliderContent>
	);
}

export default Slider;