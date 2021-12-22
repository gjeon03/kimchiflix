import styled from "styled-components";
import { motion } from "framer-motion";

export const SliderContent = styled.div`
	width: 100%;
	height: 100%;
	margin-bottom: 330px;
`;

export const RowBox = styled.div`
	position: relative;
`;

export const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	width: 100%;
	position: absolute;
`;

export const MoviesMove = styled.div`
	position:relative;
	z-index: 10;
`;

export const SlicerTitle = styled.span`
	padding: 20px;
	font-size: 30px;
	font-weight: 400;
`;

export const SliderLeftBox = styled(motion.div)`
	height:300px;
	position:absolute;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	left: 0;
`;

export const SliderBtn = styled.svg`
	width: 25px;
	height: 100px;
`;

export const SliderRightBox = styled(motion.div)`
	height:300px;
	position:absolute;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	right: 0;
`;

export const Box = styled(motion.div) <{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: 100% 100%;
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

export const Info = styled(motion.div)`
	padding: 10px;
	background: linear-gradient(rgba(47, 47, 47, 0), rgba(47, 47, 47, 1));
	opacity: 0;
	display: flex;
	flex-direction: column;
	justify-content: end;
	width: 100%;
	height: 100%;
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