import React, { PropTypes } from 'react';
import StarIcon from 'react-icons/lib/md/star';

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
