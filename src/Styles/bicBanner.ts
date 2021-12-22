import styled from "styled-components";

export const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: top center;
`;

export const Title = styled.div`
	font-size: 40px;
	font-weight: 400;
	margin-bottom: 25px;
`;

export const Overview = styled.div`
	width:50%;
	font-size: 16px;
	font-weight: 350;
`;

export const MovieInfo = styled.div`
	display: flex;
	padding:10px;
	font-weight:400;
	span:first-child{
		margin-right: 20px;
	}
`;