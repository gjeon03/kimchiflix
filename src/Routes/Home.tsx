import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getNowMovies } from "../api";
import { IGetApiDataResult } from "../types";
import { makeImagePath } from "../utils";
import Loader from "../Components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
	MainMotion,
	MainImg,
	Title,
	LeftBtn,
	RightBtn,
	MovieBtn,
	TitileContainer
} from "../Styles/home";
import { Helmet } from "react-helmet-async";



const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0
		};
	}
};

const movieBtn = {
	hover: {
		scale: 1.3,
		color: "#E51013",
		border: "3px solid #E51013"
	}
}

const moveBtn = {
	hover: {
		scale: 1.3,
		color: "#E51013",
		border: "2px solid #E51013",
		transition: {
			delay: 0,
			duaration: 0.1,
			type: "tween",
		},
	}
}

function Home() {
	const navigate = useNavigate();
	const [[page, direction], setPage] = useState([0, 0]);
	const { data, isLoading } = useQuery<IGetApiDataResult>(["movies", "nowPlaying"], getNowMovies);
	const paginate = (newDirection: number) => {
		if (data?.results.length as number - 1 < page + newDirection) {
			setPage([0, newDirection]);
		} else if (0 > page + newDirection) {
			console.log("hello")
			setPage([data?.results.length as number - 1, newDirection]);
			console.log(data?.results.length as number - 1);
		} else {
			setPage([page + newDirection, newDirection]);
			console.log(page + newDirection, newDirection);
		}
	};
	const swipeConfidenceThreshold = 10000;
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity;
	};
	const onMovie = () => {
		navigate("/");
	}
	return (
		<>
			<Helmet>
				<title>Home</title>
			</Helmet>
			{ isLoading ? (<Loader />
			) : (
				<MainMotion>
					<AnimatePresence initial={false} custom={direction}>
						<MainImg
							key={page}
							bgphoto={makeImagePath(data?.results[page].backdrop_path || "", "original")}
							custom={direction}
							variants={variants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 }
							}}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={(e, { offset, velocity }) => {
								const swipe = swipePower(offset.x, velocity.x);

								if (swipe < -swipeConfidenceThreshold) {
									paginate(1);
								} else if (swipe > swipeConfidenceThreshold) {
									paginate(-1);
								}
							}}
						/>
					</AnimatePresence>
					<TitileContainer>
						<Title>최신영화와 컨텐츠를 한눈에!</Title>
						<MovieBtn
							variants={movieBtn}
							whileHover="hover"
							onClick={onMovie}
						>Go!</MovieBtn>
					</TitileContainer>
					<RightBtn variants={moveBtn} whileHover="hover" className="next" onClick={() => paginate(-1)}>
						{"<"}
					</RightBtn>
					<LeftBtn variants={moveBtn} whileHover="hover" className="prev" onClick={() => paginate(1)}>
						{">"}
					</LeftBtn>
				</MainMotion>
			)
			}
		</>
	);
}

export default Home;