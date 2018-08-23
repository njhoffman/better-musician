import React from 'react';
import PropTypes from 'prop-types';
import { MdStar as StarIcon } from 'react-icons/md';

const Stars = ({ number, starColor, style }) => {
  // if (isNaN(number)) {
  //   debugger;
  // }
  return (
    <div style={style}>
      { [...Array(number)].map((x, i) =>
        <StarIcon key={i} style={{ color: starColor }} />
      ) }
    </div>
  );
};

Stars.propTypes = {
  number:    PropTypes.number.isRequired,
  starColor: PropTypes.string,
  style:     PropTypes.object
};

export default Stars;
