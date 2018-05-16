import React from 'react';

const RightSlider = ({ styling, shown, children, rotate }) =>
  <div {...styling([
    'rightSlider',
    shown ? 'rightSliderShown' : null,
    rotate ? 'rightSliderRotate' : null,
    rotate && shown ? 'rightSliderRotateShown' : null
  ])}>
  {children}
</div>;

export default RightSlider;
