import {
  blueGrey,
  grey,
  yellow
} from '@material-ui/core/colors';

export default {
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiDialog: {
      paper: {
        maxHeight: '0px'
      }
    }
  },
  app: {
    headerHeight:           '50px',
    footerHeight:           '75px',
    starColor:            yellow['A200'],
    headerLinksColor:     blueGrey['300'],
    footerFiller:        'linear-gradient(180deg, rgb(33,33,33) 0%, rgb(10,10,10) 20%, rgb(0,0,0) 100%)',
    canvasColor:          grey['900'],
    fieldsViewLabel:      blueGrey['500']
  },
  appMap: {
    headerLinksColor : 'text.primary',
    footerFiller     : 'background.default',
    fieldsViewLabel  : 'secondary.main',
    headerBackground : 'background.default'
  }
}
