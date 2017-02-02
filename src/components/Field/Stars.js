import React, { Component, PropTypes } from 'react';
import StarIcon from 'react-icons/lib/md/star';

const RenderStars = ({ number, starColor, style }) => (
  <div style={style}>
    { [...Array(number)].map((x,i) =>
      <StarIcon key={i} style={{color: starColor}} />
    ) }
  </div>
);

export default RenderStars;
