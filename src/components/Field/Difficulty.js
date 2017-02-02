import React, { Component, PropTypes } from 'react';

const RenderDifficulty = ({ difficulty, maxDifficulty, style }) => {
  const ratio = parseFloat(1 / (difficulty / maxDifficulty));
  const red   = 255;
  const green = parseInt( (( ratio * 120) / 1.5) + 20 );
  const blue  = parseInt( (( ratio * 120) / 1.8) + 20 );
  // console.info(difficulty, ratio, red, green, blue);
  const color = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
  const numberStyle = {...style, ...{ color: color }};
  return <span style={numberStyle}>{ difficulty }</span>
};

export default RenderDifficulty;
