import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import TextInputGroup from "../layout/TextInputGroup";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists!") {
      setAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" && email === "" && password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={onChange}
            />
            <TextInputGroup
              label="Email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={onChange}
            />

            <TextInputGroup
              label="Password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={onChange}
            />
            <TextInputGroup
              label="Confirm Password"
              name="password2"
              placeholder="Enter password"
              value={password2}
              onChange={onChange}
            />

            <input
              type="submit"
              value="Register"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
