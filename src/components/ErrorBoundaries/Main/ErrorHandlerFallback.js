// Fallback.jsx
import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

const containerStyle = {
  // opacity: 0.9,
  boxSizing: 'border-box',
  backgroundColor: 'rgba(0,0,0,1.0)',
  color: '#fff',
  position: 'fixed',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  overflowY: 'auto',
  padding: '50px'
};
const btnStyle = {
  position: 'absolute',
  right: '16px',
  top: '35px',
  cursor: 'pointer',
  minWidth: '40px',
  minHeight: '30px',
  borderRadius: '5px',
  outlineStyle: 'none'
};
const preStyle = {
  fontFamily: 'monospace, monospace',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  padding: '0 6px',
  fontSize: '0.8em'
};
const componentTableStyle = {
  marginLeft: '30px',
  marginTop: '15px',
  width: 'auto'
};

const componentNameStyle = {
  paddingRight: '15px',
  color: 'rgba(255, 215, 215, 1)'
};

const componentSourceStyle = {
  color: '#888888'
};

const ErrorHandlerFallback = (props) => {
  const { error, errorInfo, closeErrorModal } = props;
  const errorTitle = error.message.split('\n')[0];
  const errorComponents = [];
  error.message.split('\n').forEach((msg, idx) => {
    if (idx > 0) {
      const matches = msg.match(/(in) ([^ ]+) \((.*)\)$/);
      if (matches && matches.length === 4) {
        errorComponents.push({ idx, component: matches[2], source: matches[3] });
      } else {
        errorComponents.push({ idx, component: msg, source: msg });
      }
    }
  });
  const stackLineRE = /at ([^(]+ )([^.]+.\/)([^:]+):(\d+):(\d+)/;
  const stackTitle = error.stack.split('\n')[0];
  const stackLines = error.stack.replace(stackTitle, '').split('\n')
    .map((line, idx) => ({ line, idx }));

  const stackFormatted = stackLines.map(({ line, idx }) => {
    const matches = line.match(stackLineRE);
    if (matches && matches.length === 6 && matches[3].indexOf('node_modules') === -1) {
      return (
        <span style={{ display: 'block' }} key={idx}>
          <span style={{ color: '#ffffff' }}>{matches[1]}</span>
          <span>{matches[2]}</span>
          <span style={{ color: '#ffffff' }}>{matches[3]}</span>
          <span>:</span>
          <span style={{ color: '#aaccff', fontWeight: 'bold' }}>{matches[4]}</span>
          <span>:</span>
          <span style={{ color: '#ccddff' }}>{matches[5]}</span>
        </span>
      );
    }
    return (<span style={{ display: 'block' }} key={idx}>{line}</span>);
  });

  return (
    <Modal>
      <div style={containerStyle}>
        <button type='button' style={btnStyle} onClick={closeErrorModal}>Close</button>
        <div>
          <pre style={{ ...preStyle, color: '#ff0404', fontSize: '1.0em' }}>
            {errorTitle}
          </pre>
          <div style={{ ...preStyle }}>
            <table style={{ ...componentTableStyle }}>
              <tbody>
                {errorComponents && errorComponents.map((ec, i) => (
                  <tr key={ec.idx}>
                    <td style={{ ...componentNameStyle }}>{ec.component}</td>
                    <td style={{ ...componentSourceStyle }}>{ec.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <p>
            Stack
          </p>
          <pre style={{ ...preStyle, color: 'rgba(255, 215, 215, 1)' }}>
            {stackTitle}
          </pre>
          <pre style={{ ...preStyle, color: '#888888' }}>
            <code>
              {stackFormatted.map((formattedLine, i) => (
                formattedLine
              ))}
            </code>
          </pre>
          <hr />
          <p>
            ComponentStack
          </p>
          <pre style={{ ...preStyle, color: '#f3d429' }}>
            {errorInfo.componentStack}
          </pre>
          <hr />
        </div>
      </div>
    </Modal>
  );
};

ErrorHandlerFallback.defaultProps = {
  errorInfo: null
};

ErrorHandlerFallback.propTypes = {
  error:           PropTypes.instanceOf(Object).isRequired,
  errorInfo:       PropTypes.instanceOf(Object),
  closeErrorModal: PropTypes.func.isRequired
};

export default ErrorHandlerFallback;
