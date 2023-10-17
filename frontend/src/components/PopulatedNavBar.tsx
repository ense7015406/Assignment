import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
	return (
		<NavBar>
			<NavItem>SPEED</NavItem>
			<NavItem route="/" end>
				Home
			</NavItem>
			<NavItem route="/moderateViewPage">Moderate Page</NavItem>
			<NavItem route="/articles">View articles</NavItem>
			<NavItem route="/articles/newArticleForm">Submit new</NavItem>
		</NavBar>
	);
};

export default PopulatedNavBar;
