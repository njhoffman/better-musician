import {
  blueGrey200, blueGrey300, blueGrey400, blueGrey500, blueGrey600, blueGrey700, blueGrey800,
  grey800, grey900,
  pinkA100,
  yellowA200,
  fullWhite
} from 'material-ui/styles/colors';
import { fade, darken } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing:                spacing,
  fontFamily:             'Roboto, sans-serif',
  themeName:              'Steel Blue (Dark)',
  palette:                {
    primary1Color:        blueGrey800,
    primary2Color:        blueGrey700,
    primary3Color:        blueGrey600,
    accent1Color:         blueGrey200,
    accent2Color:         blueGrey400,
    accent3Color:         pinkA100,
    textColor:            fade(fullWhite, 0.8),
    secondaryTextColor:   fade(fullWhite, 0.5),
    alternateTextColor:   fullWhite,
    canvasColor:          grey900,
    borderColor:          fade(fullWhite, 0.3),
    disabledColor:        fade(fullWhite, 0.3),
    pickerHeaderColor:    fade(fullWhite, 0.12),
    clockCircleColor:     fade(fullWhite, 0.12)
  },
  starColor:              yellowA200,
  backgroundColor:        'linear-gradient(135deg, #141a1e 0%,#627c91 50%,#627c91 52%,#141a1e 100%)',
  raisedButton:           {
    secondaryColor:       grey800
  },
  snackbar:               {
    backgroundColor:      'green',
    opacity:              0.5
  },
  flatButton:             {
    secondaryColor:       grey800
  },
  tableRow:               {
    stripeColor:          darken(blueGrey200, 0.7)
  },
  instrumental:           {
    headerLinksColor:     blueGrey300,
    footerFiller:         'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    fieldsViewLabelColor: blueGrey500
  }
};
