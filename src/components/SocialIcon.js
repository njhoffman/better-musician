import React from 'react';
import PropTypes from 'prop-types';
import facebookIcon from 'assets/fb-icon.png';
import googleIcon from 'assets/google-icon.png';

const SocialIcon = ({
  name,
  ...props
}) => {
  const iconImage = (name === 'google' ? googleIcon : facebookIcon);
  return (<img src={iconImage} alt='Social Icon' {...props} />);
};

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired
};

export default SocialIcon;
