import { red, yellow, grey } from '@material-ui/core/colors';

import { darken } from '@material-ui/core/styles/colorManipulator';
import spacing from '@material-ui/core/styles/spacing';
// const fullWhite = '#ffffff';

export default {
  spacing,
  themeName:            'Crimson Red',
  palette:              {
    primary: {
      main:             darken(red['900'], 0.7)
    },
    secondary: {
      main:              red['600']
    }
  },
  typography:         {
    fontFamily:       '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize:         14
  },
  backgroundColor:      'linear-gradient(135deg, #141a1e 0%,#220000 49%,#220000 52%,#141a1e 100%)',
  app: {
    starColor:        yellow['200'],
    // headerLinksColor: blueGrey['300'],
    footerFiller:     'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    canvasColor:      grey['900'],
    // fieldsViewLabel:  blueGrey['500']
  }
};

// const old = {
//   spacing:              spacing,
//   fontFamily:           'Roboto, sans-serif',
//   themeName:            'Crimson Red',
//   palette:              {
//     primary1Color:      darken(red['900'], 0.7),
//     primary2Color:      red['900'],
//     primary3Color:      red['800'],
//     accent1Color:       red['600'],
//     accent2Color:       pink['A400'],
//     accent3Color:       pink['A100'],
//     textColor:          fullWhite,
//     secondaryTextColor: fade(fullWhite, 0.7),
//     alternateTextColor: fade(fullWhite, 0.5),
//     canvasColor:        grey['900'],
//     borderColor:        fade(fullWhite, 0.3),
//     disabledColor:      fade(fullWhite, 0.3),
//     pickerHeaderColor:  fade(fullWhite, 0.12),
//     clockCircleColor:   fade(fullWhite, 0.12)
//   },
//   starColor:            yellow['A200'],
//   backgroundColor:      'linear-gradient(135deg, #141a1e 0%,#220000 49%,#220000 52%,#141a1e 100%)',
//   raisedButton:         {
//     secondaryColor:     grey['800']
//   },
//   instrumental:         {
//     headerLinksColor:   lighten(red['100'], 0.5)
//   }
// };
