import {
  cyan700,
  grey600,grey800,grey900,
  pinkA100, pinkA200, pinkA400,
  red900,red800,red700,red600,red500,red100,
  yellowA200,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade, darken, lighten} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  themeName: 'Deep Red (Dark)',
  palette: {
    primary1Color: darken(red900, 0.7),
    primary2Color: red900,
    primary3Color: red800,
    accent1Color: red600,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: fade(fullWhite, 0.5),
    canvasColor: grey900,
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  starColor: yellowA200,
  backgroundColor: "linear-gradient(135deg, #141a1e 0%,#220000 49%,#220000 52%,#141a1e 100%)",
  raisedButton: {
    secondaryColor: grey800
  },
  instrumental: {
    headerLinksColor: lighten(red100, 0.5)
  }

};
