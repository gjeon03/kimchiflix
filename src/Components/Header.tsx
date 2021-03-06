import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Nav,
	Col,
	Logo,
	Items,
	Item,
	Search,
	LightBox,
	Input
} from "../Styles/header";

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
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
};

interface IForm {
	keyword: string;
}

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
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<IForm>();
	const onValid = (data: IForm) => {
		navigate(`/search?keyword=${data.keyword}`);
	};
	return (
		<Nav variants={navVariants} animate={navAnimation} initial={"top"}>
			<Col>
				<Link to="/kimchiflix">
					<Logo
						variants={logoVariants}
						whileHover="active"
						animate="normal"
						width="1024"
						fill="currentColor"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path d="M535.68 260.59L448 321.05V447l87.66 60.39c17 11.68 40.32-.23 40.32-20.63V281.22c.02-20.32-23.25-32.32-40.3-20.63zM368.2 288H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h48v112.2a47.81 47.81 0 0 0 47.8 47.8h256.4a47.81 47.81 0 0 0 47.8-47.8V335.8a47.81 47.81 0 0 0-47.8-47.8zM352 0c-48.57 0-90.31 27.37-112 67.23C218.31 27.37 176.57 0 128 0a128 128 0 0 0 0 256h224a128 128 0 0 0 0-256zM128 192a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64zm224 0a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64z" />
					</Logo>
				</Link>
				<Items>
					<Item>
						<Link to="/">
							Movie {homeMatch && <LightBox layoutId="lightBox" />}
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
				<Search onSubmit={handleSubmit(onValid)}>
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
						{...register("keyword", { required: true, minLength: 2 })}
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