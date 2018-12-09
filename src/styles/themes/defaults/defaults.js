import spacing from '@material-ui/core/styles/spacing';

// global site default custom values
export default {
  app: {
    formField: {
      variant: 'group' // label, group
    },
    buttons: {
      add: {
        color: 'white',
        backgroundColor: '#37674f'
      },
      delete: {
        backgroundColor: '#5e1313'
      }
    },
    snackbar: {
      transition: {
        // name: 'slide', // slide, fade
        // props: { direction: 'up', timeout: { enter: 225, exit: 195 } },
        name: 'fade',
        props: { timeout: { enter: 1000, exit: 500 } },
      },
      duration: 8000,
      anchorVertical: 'top',
      anchorHorizontal: 'center',
      styleVariant: 'over', // left, over
      success:  {
        backgroundColor: '#216843'
      },
      error: {
        backgroundColor: '#7e1313'
      },
      warning: {
        backgroundColor: '#ba5c00'
      }
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#000 !important'
      }
    }
  },
  spacing,
  fontFamily: 'Roboto, sans-serif',
  themeName: 'Default',
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 960,
      xl: 1280
    }
  }
};
