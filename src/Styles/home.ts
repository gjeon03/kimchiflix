import styled from "styled-components";
import { motion } from "framer-motion";

export const MainMotion = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MainImg = styled(motion.div) <{ bgphoto: string }>`
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(
			270deg, 
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0.4),
			rgba(0, 0, 0, 0.8),
			rgba(0, 0, 0, 0.9),
			rgba(0, 0, 0, 1)
		),
		url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	position: absolute;
	overflow: hidden;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const TitileContainer = styled.div`
	position: absolute;
	top: 200px;
	left: 100px;
	z-index: 3;
	display: flex;
	flex-direction: column;
`;

export const Title = styled.div`
	color: white;
	font-size: 40px;
	z-index: 5;
	font-weight:600;
`;

export const MovieBtn = styled(motion.div)`
	width: 70px;
	z-index: 2;
	border: 3px solid white;
	border-radius: 20px;
	font-size: 30px;
	padding: 5px 10px;
	font-weight: 600;
	cursor: pointer;
	display: block;
`;

const Btn = styled(motion.div)`
	top: calc(50% - 20px);
	position: absolute;
	border-radius: 30px;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
	cursor: pointer;
	font-weight: bold;
	font-size: 18px;
	z-index: 2;
`;

export const LeftBtn = styled(Btn)`
	right: 10px;
	background: rgba(0, 0, 0, 0.5);
`;
export const RightBtn = styled(Btn)`
	left: 10px;
	background: rgba(255, 255, 255, 0.5);
`;