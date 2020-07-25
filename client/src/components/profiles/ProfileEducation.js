import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {education.length > 0 ? (
        <Fragment>
          {education.map((edu, idx) => (
            <div key={idx}>
              <h3 className="text-dark">{edu.school}</h3>
              <p>
                <Moment format="YYYY MMM DD">{edu.from}</Moment> -{" "}
                {edu.current ? (
                  "Current"
                ) : (
                  <Moment format="YYYY MMM DD">{edu.to}</Moment>
                )}
              </p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field of Study: </strong>
                {edu.fieldofstudy}
              </p>
              <p>
                <strong>Description: </strong>
                {edu.description}
              </p>
            </div>
          ))}
        </Fragment>
      ) : (
        <h4>No School Credientals </h4>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
