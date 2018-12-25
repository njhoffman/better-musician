import { css, keyframes } from 'styled-components';

const ripple = theme => `
  & {
    position: relative;
    overflow: hidden;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, ${theme.base07} 11%, transparent 11%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }
  &:active:after {
    transform: scale(0, 0);
    opacity: .2;
    transition: 0s;
  }
`;

export const style = ({ theme, primary, disabled }) => css`
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  outline: none;
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  border: none;
  text-transform: uppercase;
  margin: auto 0;
  background-color: ${primary ? theme.base05 : theme.base01};
  ${disabled ? `
  cursor: not-allowed;
  color: ${theme.base04};
  opacity: 0.6;
  ` : `
  cursor: pointer;
  color: ${primary ? theme.base00 : theme.base05};
  `}
  ${!disabled ? `
    box-shadow:
      0 2px 2px 0 ${theme.base03},
      0 3px 1px -2px ${theme.base02},
      0 1px 5px 0 ${theme.base02};
  ` : ''}
  &:hover, &:focus:not(:active) {
    background-color: ${theme.base02};
  }
  &:focus:not(:active) {
    background-color: ${theme.base02};
    box-shadow: 0 0 4px ${theme.base02}, 0 4px 8px ${theme.base04};
  }
  ${ripple(theme)}
`;
