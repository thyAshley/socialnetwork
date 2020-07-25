import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({ profile }) => {
  const { status, company, location, website, social, user } = profile;
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
        {status} {company ? `at ${company}` : ""}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe fa-2x"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube fa-2x"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
