import {
  blueGrey,
  grey,
  pink,
  yellow,
  white
  // blueGrey200, blueGrey300, blueGrey400, blueGrey500, blueGrey600, blueGrey700, blueGrey800,
  // grey800, grey900,
  // pinkA100,
  // yellowA200,
  // fullWhite
} from 'material-ui/colors';

import { fade, darken } from 'material-ui/styles/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing:                spacing,
  fontFamily:             'Roboto, sans-serif',
  themeName:              'Steel Blue (Dark)',
  palette:                {
    primary1Color:        blueGrey['800'],
    primary2Color:        blueGrey['700'],
    primary3Color:        blueGrey['600'],
    accent1Color:         blueGrey['200'],
    accent2Color:         blueGrey['400'],
    accent3Color:         pink['A100'],
    textColor:            fade('#ffffff', 0.8),
    secondaryTextColor:   fade('#ffffff', 0.5),
    alternateTextColor:   '#ffffff',
    canvasColor:          grey['900'],
    borderColor:          fade('#ffffff', 0.3),
    disabledColor:        fade('#ffffff', 0.3),
    pickerHeaderColor:    fade('#ffffff', 0.12),
    clockCircleColor:     fade('#ffffff', 0.12)
  },
  starColor:              yellow['A200'],
  backgroundColor:        'linear-gradient(135deg, #141a1e 0%,#627c91 50%,#627c91 52%,#141a1e 100%)',
  raisedButton:           {
    secondaryColor:       grey['800']
  },
  snackbar:               {
    backgroundColor:      'green',
    opacity:              0.5
  },
  flatButton:             {
    secondaryColor:       grey['800']
  },
  tableRow:               {
    stripeColor:          darken(blueGrey['200'], 0.7)
  },
  instrumental:           {
    headerLinksColor:     blueGrey['300'],
    footerFiller:         'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    fieldsViewLabelColor: blueGrey['500']
  }
};
