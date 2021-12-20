import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";

const Nav = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	width: 100%;
	top: 0;
	font-size: 14px;
	padding: 20px 60px;
	color: white;
`;

const Col = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled(motion.svg)`
	margin-right: 50px;
	width: 50px;
	height: 25px;
	fill: ${(props) => props.theme.red};
	path {
		stroke-width: 6px;
		stroke: white;
	}
`;

const Items = styled.ul`
	display: flex;
	align-items: center;
`;

const Item = styled.li`
	margin-right: 20px;
	color: ${(props) => props.theme.white.darker};
	transition: color 0.3s ease-in-out;
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;
	&:hover {
		color: ${(props) => props.theme.white.lighter};
	}
`;

const Search = styled.div`
	color: white;
	display: flex;
	align-items: center;
	position: relative;
	svg {
		height: 25px;
	}
`;

const LightBox = styled(motion.span)`
	width: 30px;
	height: 5px;
	position: absolute;
	border-radius: 2.5px;
	bottom: -7px;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
	transform-origin: right center;
	position: absolute;
	right: 0px;
	padding: 5px 10px;
	padding-left: 40px;
	z-index: -1;
	color: white;
	font-size: 16px;
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
	normal: {
		fillOpacity: 1,
	},
	active: {
		fillOpacity: [0, 1, 0],
		transition: {
			repeat: Infinity,
		},
	},
};

const navVariants = {
	top: {
		backgroundColor: "rgba(0, 0, 0, 0)",
	},
	scroll: {
		backgroundColor: "rgba(0, 0, 0, 1)",
	},
};

function Header() {
	const homeMatch = useMatch("/");
	const tvMatch = useMatch("/tv");
	const [searchOpen, setSearchOpen] = useState(false);
	const inputAnimation = useAnimation();
	const navAnimation = useAnimation();
	const { scrollY } = useViewportScroll();
	const toggleSearch = () => {
		if (searchOpen) {
			inputAnimation.start({
				scaleX: 0,
			});
		} else {
			inputAnimation.start({ scaleX: 1 });
		}
		setSearchOpen((prev) => !prev);
	};
	useEffect(() => {
		scrollY.onChange(() => {
			if (scrollY.get() > 80) {
				navAnimation.start("scroll");
			} else {
				navAnimation.start("top");
			}
		});
	}, [scrollY, navAnimation]);
	return (
		<Nav variants={navVariants} animate={navAnimation} initial={"top"}>
			<Col>
				<Link to="/">
					<Logo
						variants={logoVariants}
						whileHover="active"
						animate="normal"
						width="1024"
						fill="currentColor"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z" />
					</Logo>
				</Link>
				<Items>
					<Item>
						<Link to="/">
							Home {homeMatch && <LightBox layoutId="lightBox" />}
						</Link>
					</Item>
					<Item>
						<Link to="/tv">
							Tv Shows {tvMatch && <LightBox layoutId="lightBox" />}
						</Link>
					</Item>
				</Items>
			</Col>
			<Col>
				<Search>
					<motion.svg
						onClick={toggleSearch}
						animate={{ x: searchOpen ? -185 : 0 }}
						transition={{ type: "linear" }}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						></path>
					</motion.svg>
					<Input
						animate={inputAnimation}
						initial={{ scaleX: 0 }}
						transition={{ type: "linear" }}
						placeholder="Search for movie or tv show..."
					/>
				</Search>
			</Col>
		</Nav>
	);
}

export default Header;