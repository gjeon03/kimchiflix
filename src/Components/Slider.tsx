import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IGetApiDataResult } from "../types";
import {
	SliderContent,
	RowBox,
	Row,
	MoviesMove,
	SliderTitle,
	SliderLeftBox,
	SliderBtn,
	SliderRightBox,
} from "../Styles/slider";
import SliderBox from "./SliderBox";

const rowVariants = {
	hidden: (btnFlag: boolean) => ({
		x: btnFlag ? window.outerWidth : -window.outerWidth,
	}),
	visible: {
		x: 0,
	},
	exit: (btnFlag: boolean) => ({
		x: btnFlag ? -window.outerWidth : window.outerWidth,
	}),
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
	data?: IGetApiDataResult;
	dataName: string;
};

function Slider({ data, dataName }: IProps) {
	const [windowSize, setWindowSize] = useState<number | undefined>();
	useEffect(() => {
		function handleResize() {
			setWindowSize(
				window.innerWidth,
			);
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const [offset, setOffet] = useState(6);
	useEffect(() => {
		const tmp = Math.floor(window.innerWidth / 215);
		setOffet(tmp > 5 ? 6 : tmp);
	}, [windowSize]);
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
	return (
		<>
			<SliderContent>
				<SliderTitle>{dataName}</SliderTitle>
				<RowBox>
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
								.slice(0)
								.slice(offset * index, offset * index + offset)
								.map((movie: any, index) => (
									<SliderBox key={index} {...{ ...movie, dataName }} />
								))}
						</Row>
					</AnimatePresence>
				</RowBox>
			</SliderContent>
		</>
	);
}

export default Slider;