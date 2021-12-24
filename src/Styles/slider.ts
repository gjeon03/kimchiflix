import styled from "styled-components";
import { motion } from "framer-motion";

export const SliderContent = styled.div`
	width: 100%;
	height: auto;
	//margin-bottom: 330px;
`;

export const RowBox = styled.div`
	position: relative;
	height: 330px;
`;

export const Row = styled(motion.div)`
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	width: 100%;
	position: absolute;
	top: 0;
	height: auto;
`;

export const MoviesMove = styled.div`
	position:relative;
	z-index: 10;
`;

export const SliderTitle = styled.span`
	padding: 10px;
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
	//background-size: cover;
	background-position: center center;
	min-height: 200px;
	max-height: 330px;
	font-size: 66px;
	cursor: pointer;
	width: 100%;
	padding-top : calc(300 / 350 * 100%);
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