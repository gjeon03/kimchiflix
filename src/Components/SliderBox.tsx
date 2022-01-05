import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { layoutIdState } from "../atoms";
import { makeImagePath, selecRouteName } from "../utils";
import {
	Box,
	Info,
} from "../Styles/slider";

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -70,
		transition: {
			delay: 0.3,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const infoVariants = {
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
	id: number;
	backdrop_path: string;
	poster_path: string;
	name: string;
	overview: string;
	first_air_date: string,
	vote_average: number,
	title: string,
	media_type: string,
	release_date: string,
	dataName: string;
}

function SliderBox({ ...movie }: IProps) {
	const location = useLocation();
	const routeName = selecRouteName(useLocation().pathname.split("/")[1]);
	const setLayoutIdAtom = useSetRecoilState(layoutIdState);
	const navigate = useNavigate();
	const onBoxClicked = async (movieId: number, event: React.MouseEvent<HTMLDivElement>) => {
		setZIndex(200);
		await setLayoutIdAtom(movieId + movie.dataName.replace(" ", ""));
		if (routeName === "search") {
			const keyword = new URLSearchParams(location.search).get("keyword");
			if (movie.dataName === "Movies") return navigate(`/${routeName}/${movieId}/movie?keyword=${keyword}`);
			return navigate(`/${routeName}/${movieId}/tv?keyword=${keyword}`);
		}
		return navigate(`/${routeName}/${movieId}`);
	};
	//zIndex change
	const [zIndex, setZIndex] = useState(100);
	const zIndexChangeHandler = () => {
		setZIndex(100);
	};
	return (
		<Box
			layoutId={movie.id + (movie.dataName.replace(" ", ""))}
			key={movie.id}
			whileHover="hover"
			initial="normal"
			variants={boxVariants}
			onClick={(event) => onBoxClicked(movie.id, event as any)}
			transition={{ type: "tween" }}
			bgphoto={makeImagePath(movie.poster_path, "w200")}
			onLayoutAnimationComplete={zIndexChangeHandler}
		>
			<Info variants={infoVariants}>
				<h3>{movie.title ? movie.title : movie.name}</h3>
				<span>{movie.release_date}</span>
				<span>⭐️ {movie.vote_average} / 10</span>
			</Info>
		</Box>
	);
}

export default SliderBox;