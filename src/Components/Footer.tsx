import { FooterBox } from "../Styles/footer";

function Footer() {
	return (
		<FooterBox>&copy; {new Date().getFullYear()} Kimchi Flix</FooterBox>
	);
}

export default Footer;