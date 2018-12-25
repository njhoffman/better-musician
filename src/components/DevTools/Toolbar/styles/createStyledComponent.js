import styled from 'styled-components';

const getDefaultTheme = (colors) => ({
  ...colors,
  fontFamily: "'Source Sans Pro', sans-serif",
  codeFontFamily: "'Source Code Pro', monospace",
  inputHeight: 30,
  inputBorderWidth: 1,
  inputBorderRadius: 4,
  spinnerSize: 13, // Math.floor(theme.inputHeight / 2) - 2
  inputPadding: 10, // theme.inputHeight / 3
  selectArrowWidth: 4, // Math.floor(theme.inputHeight / 7)
  inputInternalHeight: 28, // theme.inputHeight - theme.inputBorderWidth * 2
  inputBorderColor: colors.base02,
  inputFocusedStyle: `border-color: ${colors.base0D}`
});

const getStyle = (styles, type) => (
  typeof styles === 'object' ? styles[type] || styles.default : styles
);

export default (styles, component) =>
  styled(component || 'div')`${
    props => (
      props.theme.type ? getStyle(styles, props.theme.type) :
        // used outside of container (theme provider)
        getStyle(styles, 'default')({ ...props, theme: getDefaultTheme(props.theme) })
    )
  }`;
