import { css } from 'styled-components';

const getBackground = (theme, type) => {
  switch (type) {
    case 'success':
      return `background-color: ${theme.base0B};`;
    case 'warning':
      return `background-color: ${theme.base0A};`;
    case 'error':
      return `background-color: ${theme.base08};`;
    default:
      return 'background-color: #1c2431;';
      // return `background-color: ${theme.base0D};`;
  }
};

export default ({ theme, type }) => css`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  box-sizing: border-box;
  box-shadow: inset ${theme.base05} 0 0 1px;
  font-size: 0.85em;
  padding: 7px;
  width: 100%;
  color:#fff;
  ${getBackground(theme, type)}
  & > svg:first-child {
    font-size: 1.4em;
    opacity: 0.5;
  }
  & > span {
    width: 100%;
    text-align: center;
    padding: 0.1em;
  }
  & > button {
    cursor: pointer;
    float: right;
    font-size: 1.1em;
    border: 1px solid transparent;
    background: transparent;
    padding: 0.1em;
    line-height: 0;
    outline: none;
    color: inherit;
    opacity: 0.8;
  }
  & > button:hover, & > button:active {
    opacity: 1;
  }
  & > button:focus {
    border: 1px solid ${theme.base03};
  }
`;
