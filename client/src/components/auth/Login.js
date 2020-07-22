import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login To Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up Now</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};
export default connect(mapStateToProps, { login })(Login);
