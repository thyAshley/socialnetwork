import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {experience.length > 0 ? (
        <Fragment>
          {experience.map((exp, idx) => (
            <div key={idx}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                <Moment format="YYYY MMM DD">{exp.from}</Moment> -{" "}
                {exp.current ? (
                  "Current"
                ) : (
                  <Moment format="YYYY MMM DD">{exp.to}</Moment>
                )}
              </p>
              <p>
                <strong>Position: </strong>
                {exp.status}
              </p>
              <p>
                <strong>Description: </strong>
                {exp.description}
              </p>
            </div>
          ))}
        </Fragment>
      ) : (
        <h4>No Experience Credientals </h4>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
