import styled from "styled-components";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	z-index: 11;
`;

export const BigMovie = styled(motion.div)`
	position: absolute;
	width: 70vw;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	top: 0;
	background: linear-gradient(
		rgba(0, 0, 0, 1), rgba(47, 47, 47, 1)
		);
	//background-color: ${(props) => props.theme.black.lighter};
	z-index: 12;
`;

export const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const BigCover = styled.div<{ bgphoto: string }>`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 350px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
`;

export const TitleBox = styled.div`
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

export const OriginalTitle = styled.div`
	height: 20px;
`;

export const BigTitle = styled.h3`
	font-size: 46px;
	position: relative;
`;

export const Details = styled.div`
	display: flex;
	margin-left: 20px;
	position: relative;
	top: -60px;
	font-weight: 400;
`;

export const DetailSpan = styled.span`
	margin-right: 10px;
	margin-left: 10px;
`;

export const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -60px;
	color: ${(props) => props.theme.white.lighter};
`;

export const Companies = styled.div`
	width: 100%;
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

export const CompaniesLogo = styled.div<{ bgphoto: string }>`
	width: 100px;
	height: 50px;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	background-size: 100% 100%;
`;

export const SimilarContainer = styled.div`
	margin: 30px 20px;
	h3 {
		font-weight: 400;
		font-size: 20px;
		margin-bottom: 10px;
	}
`;

export const Poster = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(130px,1fr));
	gap: 10px;
	span {
		font-weight: 400;
		font-size: 16px;
	}
`;

export const Similar = styled.div<{ bgphoto: string }>`
	height: 200px;
	background-image: url(${(props) => props.bgphoto});
	background-position: center center;
	background-size: 100% 100%;
	cursor: pointer;
	margin-bottom: 10px;
`;