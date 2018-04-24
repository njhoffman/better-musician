import {
  blueGrey,
  grey,
  pink,
  yellow,
  white
} from 'material-ui/colors';

import { fade, darken } from 'material-ui/styles/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing:                spacing,
  // fontFamily:             'Roboto, sans-serif',
  themeName:              'Steel Blue (Dark)',
  overrides : {
    MuiDrawer: {
      paper: {
        background:     'rgba(0, 0, 0, 0.95)'
      }
    }
  },
  palette:                {
    type:                 'dark',
    primary: {
      main:               blueGrey['800']
    },
    secondary: {
      main:               blueGrey['400']
    },
    background: {
      default: grey['900'],
      paper: grey['900']
      // paper, appBar, contentFrame
    }
    // secondary: {
    //   main:               blueGrey['700'],
    // },
    // text:   {
    //   primary: fade('#ffffff', 0.8),
    //   secondary: fade('#ffffff', 0.5),
    // },
    // secondaryTextColor:   fade('#ffffff', 0.5),
    // canvasColor:          grey['900'],
    // accent1Color:         blueGrey['200'],
    //
    // primary2Color:        blueGrey['700'],
    // primary3Color:        blueGrey['600'],
    // accent1Color:         blueGrey['200'],
    // accent2Color:         blueGrey['400'],
    // accent3Color:         pink['A100'],
    // primaryTextColor:     fade('#ffffff', 0.8),
    // secondaryTextColor:   fade('#ffffff', 0.5),
    // alternateTextColor:   '#ffffff',
    // canvasColor:          grey['900'],
    // borderColor:          fade('#ffffff', 0.3),
    // disabledColor:        fade('#ffffff', 0.3),
    // pickerHeaderColor:    fade('#ffffff', 0.12),
    // clockCircleColor:     fade('#ffffff', 0.12)
  },
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
    starColor:            yellow['A200'],
    headerLinksColor:     blueGrey['300'],
    footerFiller:        'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    canvasColor:          grey['900'],
    fieldsViewLabel:      blueGrey['500']
  }
};
