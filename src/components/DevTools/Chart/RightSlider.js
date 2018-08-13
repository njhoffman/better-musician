import React from 'react';
import PropTypes from 'prop-types';

const RightSlider = ({ styling, shown, children, rotate }) => (
  <div {...styling([
    'rightSlider',
    shown ? 'rightSliderShown' : null,
    rotate ? 'rightSliderRotate' : null,
    rotate && shown ? 'rightSliderRotateShown' : null
  ])}>
  {children}
</div>
);

RightSlider.propTypes = {
  styling:  PropTypes.func.isRequired,
  shown:    PropTypes.bool,
  rotate:   PropTypes.bool,
  children: PropTypes.any
};

export default RightSlider;
