import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MdStar as StarIcon } from 'react-icons/md';

const Stars = ({ number, starColor, className, style }) => (
  <Typography className={className} style={style}>
    {[...Array(number)]
      .map((x, i) => ({ idx: `star-${i}` }))
      .map(star => (
        <StarIcon key={star.idx} style={{ color: starColor }} />
      ))}
  </Typography>
);

Stars.defaultProps = {
  className: '',
  style: {},
  starColor: 'yellow'
};

Stars.propTypes = {
  className: PropTypes.string,
  number:    PropTypes.number.isRequired,
  starColor: PropTypes.string,
  style:     PropTypes.instanceOf(Object)
};

export default Stars;
