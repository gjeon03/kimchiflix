import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll, useAnimation } from "framer-motion";
import {
	getNowMovies,
	IGetMoviesResult,
	getPopularMovies,
	getTopMovies,
	getUpCmingMovies
} from "../api";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import BicBanner from "../Components/BicBanner";
import Slider from "../Components/Slider";

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

const SliderContainer = styled.div`
	position: relative;
	top: -180px;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const Overlay = styled.div``;
const BicMovie = styled.div``;
const BicCover = styled.div``;
const BicTitle = styled.h3``;
const BigOverview = styled.p``;

function Home() {
	const { data: nowData, isLoading: nowLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowMovies);
	const { data: popuarData, isLoading: popuarLoading } = useQuery<IGetMoviesResult>(["movie", "popular"], getPopularMovies);
	const { data: topData, isLoading: topLoading } = useQuery<IGetMoviesResult>(["movie", "top"], getTopMovies);
	const { data: upData, isLoading: upLoading } = useQuery<IGetMoviesResult>(["movie", "up"], getUpCmingMovies);
	return (
		<Wrapper>
			{nowLoading ? (<Loader>Loading...</Loader>
			) : (
				<>
					<BicBanner data={nowData?.results[0]} />
					<SliderContainer>
						<Slider data={nowData} infoName="now" />
						{popuarLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={popuarData} infoName="popular" />
						)}
						{topLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={topData} infoName="top" />
						)}
						{upLoading ? (<Loader>Loading...</Loader>
						) : (
							<Slider data={upData} infoName="up" />
						)}
					</SliderContainer>
				</>
			)}
		</Wrapper>
	);
}

export default Home;