import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserProfile } from "../../redux/actions/profile";

const Dashboard = (props) => {
  useEffect(() => {
    props.getUserProfile();
  }, []);
  return <div></div>;
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
