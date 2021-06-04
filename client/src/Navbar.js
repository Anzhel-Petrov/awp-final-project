import { React } from "react";
import { Link } from "@reach/router";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navbar(props) {
  const { categories, filterByTopic, authService, Logout } = props;
  // const [category, setCategory] = useState("");

  function handleClick(category) {
    // console.log(category);
    // setCategory(category);
    filterByTopic(category);
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Q and A App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createpost" className="nav-link">
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            {authService.loggedIn() ? (
              <li className="nav-item" onClick={() => Logout()}>
                <Link to="#" className="nav-link">
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            <li>
              <NavDropdown title="Post Topics" id="nav-dropdown">
                <NavDropdown.Item onClick={() => handleClick("")}>
                  All Topics
                </NavDropdown.Item>
                {categories.map((category) => (
                  <NavDropdown.Item onClick={() => handleClick(category.name)}>
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
