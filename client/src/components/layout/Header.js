import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contacts/contactContext";

const Header = (props) => {
  const { branding } = props;
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const { logout, success, isAuthenticated } = authContext;

  // console.log(isAuthenticated);
  // console.log(success);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <i className="fas fa-home" /> Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/add" className="nav-link">
          <i className="fas fa-plus" /> Add
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          <i className="fas fa-question" /> About
        </Link>
      </li>
      <li className="nav-item">
        <a href="!#" className="nav-link" onClick={onLogout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  branding: PropTypes.string.isRequired,
};
export default Header;
