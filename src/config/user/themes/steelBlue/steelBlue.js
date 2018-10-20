import {
  blueGrey,
  grey,
  yellow
} from '@material-ui/core/colors';
// import { fade, darken, lighten } from '@material-ui/core/styles/colorManipulator';

import spacing from '@material-ui/core/styles/spacing';

export default {
  spacing: spacing,
  themeName: 'Steel Blue',
  overrides: {
    MuiDrawer: {
      paper: {
        background: 'rgba(0, 0, 0, 0.95)'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }
    },
  },
  palette: {
    primary: {
      main: blueGrey['800']
    },
    secondary: {
      main: blueGrey['400']
    }
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", sans-serif',
    fontSize: 13
  },
  backgroundColor:    'linear-gradient(135deg, #141a1e 0%,#627c91 50%,#627c91 52%,#141a1e 100%)',
  app: {
    starColor:        yellow['200'],
    headerLinksColor: blueGrey['300'],
    footerFiller:     'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    canvasColor:      grey['900'],
    fieldsViewLabel:  blueGrey['500']
  }
};

// const old = {
//   spacing:                spacing,
//   fontFamily:             'Roboto, sans-serif',
//   themeName:              'Steel Blue',
//   overrides : {
//     MuiDrawer: {
//       paper: {
//         background:     'rgba(0, 0, 0, 0.95)'
//       }
//     }
//   },
//   palette: {
//     secondaryTextColor:   fade('#ffffff', 0.5),
//     canvasColor:          grey['900'],
//     accent1Color:         blueGrey['200'],
//     primary1Color:      blueGrey['800'],
//     primary2Color:        blueGrey['700'],
//     primary3Color:        blueGrey['600'],
//     accent1Color:         blueGrey['200'],
//     accent2Color:         blueGrey['400'],
//     accent3Color:         pink['A100'],
//     primaryTextColor:     fade('#ffffff', 0.8),
//     secondaryTextColor:   fade('#ffffff', 0.5),
//     alternateTextColor:   '#ffffff',
//     canvasColor:          grey['900'],
//     borderColor:          fade('#ffffff', 0.3),
//     disabledColor:        fade('#ffffff', 0.3),
//     pickerHeaderColor:    fade('#ffffff', 0.12),
//     clockCircleColor:     fade('#ffffff', 0.12)
//   },
//   backgroundColor:        'linear-gradient(135deg, #141a1e 0%,#627c91 50%,#627c91 52%,#141a1e 100%)',
//   raisedButton:           {
//     secondaryColor:       grey['800']
//   },
//   snackbar:               {
//     backgroundColor:      'green',
//     opacity:              0.5
//   },
//   flatButton:             {
//     secondaryColor:       grey['800']
//   },
//   tableRow:               {
//     stripeColor:          darken(blueGrey['200'], 0.7)
//   }
// };
