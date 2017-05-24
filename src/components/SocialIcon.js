import React from 'react';
import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';

const SocialIcon = (props) => {
  const { name, style } = props;
  const iconImage = (name === 'google' ? googleIcon : facebookIcon);
  return (
    <img
      src={iconImage}
      style={style}
      {...props} />
  );

};

export default SocialIcon;
