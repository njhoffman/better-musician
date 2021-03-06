import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Difficulty = ({ difficulty, maxDifficulty, style }) => {
  const ratio = parseFloat(1 / (difficulty / maxDifficulty));
  const red   = 255;
  const green = parseInt(((ratio * 120) / 1.5) + 20, 10);
  const blue  = parseInt(((ratio * 120) / 1.8) + 20, 10);
  const color = `rgba(${red}, ${green}, ${blue}, 1)`;
  const numberStyle = { ...style, color };
  return (
    <Typography style={numberStyle}>
      {difficulty}
    </Typography>
  );
};

Difficulty.defaultProps = {
  style: {}
};

Difficulty.propTypes = {
  difficulty: PropTypes.number.isRequired,
  maxDifficulty: PropTypes.number.isRequired,
  style: PropTypes.instanceOf(Object)
};

export default Difficulty;
