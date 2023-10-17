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
					<NavItem route="/moderateViewPage">Moderate Page</NavItem>
					<NavItem route="/articles">View articles</NavItem>
				</NavDropdown>
			</NavItem>
			<NavItem route="/" end>
				Home
			</NavItem>
			<NavItem route="/articles/newArticleForm">Submit new</NavItem>
		</NavBar>
	);
};

export default PopulatedNavBar;
