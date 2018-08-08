import React from 'react';
import PropTypes from 'prop-types';
import { MdStar as StarIcon } from 'react-icons/md';

const RenderStars = ({ number, starColor, style }) => (
  <div style={style}>
    { [...Array(number)].map((x, i) =>
      <StarIcon key={i} style={{ color: starColor }} />
    ) }
  </div>
);

RenderStars.propTypes = {
  number:    PropTypes.number.isRequired,
  starColor: PropTypes.string,
  style:     PropTypes.object
};

export default RenderStars;
