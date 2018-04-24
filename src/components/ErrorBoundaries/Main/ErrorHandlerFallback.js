// Fallback.jsx
import React from 'react'
import Modal from './Modal'

const containerStyl = {
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
const btnStyl = {
  position: 'absolute',
  right: '16px',
  top: '35px',
  cursor: 'pointer',
  minWidth: '40px',
  minHeight: '30px',
  borderRadius: '5px',
  outlineStyle: 'none'
};
const preSty = {
  fontFamily: 'monospace, monospace',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  padding: '0 6px',
  fontSize: '0.8em'
};
const detailSty = {
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
  WebkitHighlight: 'none'
};


const componentTableSty = {
  marginLeft: '30px',
  marginTop: '15px',
  width: 'auto'
};

const componentNameSty = {
  paddingRight: '15px',
  color: 'rgba(255, 215, 215, 1)'
};

const componentSourceSty = {
  color: '#888888'
};

export default function Fallback(props) {
  const { error, errorInfo, closeErrorModal } = props;
  const errorTitle = error.message.split('\n')[0];
  let errorComponents = [];
  error.message.split('\n').forEach((msg, i) => {
    if (i > 0) {
      const matches = msg.match(/(in) ([^ ]+) \((.*)\)$/);
      if (matches && matches.length === 4) {
        errorComponents.push({ component: matches[2], source: matches[3] });
      } else {
        errorComponents.push({ component: msg, source: msg});
      }
    }
  });
  const stackTitle = error.stack.split('\n')[0];
  const stackLines = error.stack.replace(stackTitle, '');

  return (
    <Modal>
      <div style={containerStyl}>
        <button style={btnStyl} onClick={closeErrorModal}>Close</button>
        <div>
          <pre style={{...preSty, color: '#ff0404', fontSize: '1.0em'}}>
            {errorTitle}
          </pre>
          <div style={{...preSty}}>
            <table style={{...componentTableSty}}>
              <tbody>
              {errorComponents && errorComponents.map(ec =>
                <tr>
                  <td style={{...componentNameSty }}>{ec.component}</td>
                  <td style={{...componentSourceSty }}>{ec.source}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <hr />
          <p>
            Stack
          </p>
          <pre style={{...preSty, color: 'rgba(255, 215, 215, 1)'}}>
            {stackTitle}
          </pre>
          <pre style={{...preSty, color: '#888888'}}>
            {stackLines}
          </pre>
          <hr />
          <p>
            ComponentStack
          </p>
          <pre style={{...preSty, color: '#f3d429'}}>{errorInfo.componentStack}</pre>
          <hr />
        </div>
      </div>
    </Modal>
  )
}

