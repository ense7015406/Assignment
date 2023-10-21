import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
	return (
		<NavBar>
			<NavItem>SPEED</NavItem>
			<NavItem dropdown route="/articles">
				Userview <IoMdArrowDropdown />
				<NavDropdown>
					<NavItem route="/articles">All Articles</NavItem>
					<NavItem route="/moderateViewPage">Moderate Page</NavItem>
				</NavDropdown>
			</NavItem>
			<NavItem route="/" end>
				Home
			</NavItem>
			<NavItem route="/articles/newArticleForm">New Article</NavItem>
		</NavBar>
	);
};

export default PopulatedNavBar;
