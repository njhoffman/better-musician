import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MdStar as StarIcon } from 'react-icons/md';

const Stars = ({ number, starColor, className, style }) => {
  // if (isNaN(number)) {
  //   debugger;
  // }
  return (
    <Typography className={className} style={style}>
      {[...Array(number)].map((x, i) =>
        <StarIcon key={i} style={{ color: starColor }} />
      )}
    </Typography>
  );
};

Stars.propTypes = {
  number:    PropTypes.number.isRequired,
  starColor: PropTypes.string,
  style:     PropTypes.object
};

export default Stars;
