import spacing from '@material-ui/core/styles/spacing';
import {
  blueGrey,
  grey,
  yellow
} from '@material-ui/core/colors';

export default {
  spacing:                spacing,
  // fontFamily:             'Roboto, sans-serif',
  themeName:              'Default',
  breakpoints:            {
    sm:                   450,
    md:                   600,
    lg:                   960,
    xl:                   1280
  },
  instrumental:           {
    starColor:            yellow['A200'],
    headerLinksColor:     blueGrey['300'],
    footerFiller:        'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    canvasColor:          grey['900'],
    fieldsViewLabel:      blueGrey['500']
  }
};
