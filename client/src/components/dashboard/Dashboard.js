import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserProfile } from "../../redux/actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = ({ getUserProfile, auth, profile: { profile, loading } }) => {
  useEffect(() => {
    getUserProfile();
  }, []);

  return loading && profile === null ? <Spinner /> : <Fragment>test</Fragment>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getUserProfile })(Dashboard);
