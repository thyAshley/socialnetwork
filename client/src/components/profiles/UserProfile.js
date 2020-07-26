import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";
import { getProfile } from "../../redux/actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import auth from "../../redux/reducer/auth";

const UserProfile = ({
  match,
  getProfile,
  profile: { profile, loading },
  auth: { user },
}) => {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);

  useEffect(() => {
    if (profile && user) {
      setIsUser(user.user._id === profile.profile.user._id);
    }
  }, [profile, auth]);
  return (
    <Fragment>
      {profile === null || loading === true ? (
        <Spinner />
      ) : (
        <Fragment></Fragment>
      )}
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      {isUser && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit profile
        </Link>
      )}
      <div className="profile-grid my-1">
        {profile !== null && (
          <Fragment>
            <ProfileTop profile={profile.profile} />
            <ProfileAbout profile={profile.profile} />
            <ProfileExperience profile={profile.profile} />
            <ProfileEducation profile={profile.profile} />
          </Fragment>
        )}
      </div>
      {profile && <ProfileGithub profile={profile.profile} />}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfile })(UserProfile);
