import { marrakesh, twilight } from 'redux-devtools-themes';

const chartTheme = { ...marrakesh, base07: '#000000' };
const inspectorTheme = { ...twilight, base00: '#0e0e0e', base01: '#121517' };

export default {
  chart: {
    invertTheme: false,
    theme: chartTheme,
    heightBetweenNodesCoeff: 1.3,
    diffStates: true,
    style: {
      link: {
        stroke: '#223344'
      },
      node: {
        opacity: { empty: 0.4 }
      },
      text: {
        colors: { default: '#779cc1' },
        opacity: { empty: 0.4 }
      }
    }
  },
  inspector: {
    theme: inspectorTheme,
    reverseList: true,
    showIndex: true,
    styledActions: [
      ['*_START', { color: '#88ccff' }],
      ['*_COMPLETE', { color: '#88ffcc' }],
      ['*_ERROR', { color: '#ff2200' }],
      ['@@redux-form*', { color: '#666666' }],
    ],
    excludedActions: [
      '@@redux-form/FOCUS',
      '@@redux-form/BLUR',
      '@@redux-form/UNREGISTER_FIELD',
      '@@redux-form/REGISTER_FIELD',
    ],
    style: {
      inspector: {
        'font-size': '12px',
      },
      actionList: {
        'flex-basis': '70%'
      },
      actionListRows: {
        '&:after' : {
          'pointer-events': 'none',
          content: '↓',
          'font-size': '14px',
          position: 'absolute',
          height: '22px',
          width: '20px',
          'text-align': 'center',
          bottom: '2px',
          right: '-2px',
          'background-color': '#efefef',
          color: '#777'
        }
      },
      actionListItem: {
        '&:hover': {
          background: 'rgba(0, 220, 220, 0.4)'
        }
      },
      actionListItemName: {
        'white-space': 'nowrap'
      },
      actionListIsHidden: {
        display: 'flex',
        height: '3px',
        padding: '1px',
        overflow: 'hidden'
      },
      diff: {
        padding: '1px 2px',
        'border-radius': '2px',
        color: '#c3c3c3'
      },
      diffAdd: {
        'background-color': 'rgba(143, 157, 106, 0.1)',
        border: 'solid 1px rgba(143, 157, 106, 0.4)'
      },
      diffUpdateFrom: {
        'background-color': 'rgba(207, 106, 76, 0.1)',
        border: 'solid 1px rgba(207, 106, 76, 0.4)'
      },
      diffUpdateTo: {
        'background-color': 'rgba(143, 157, 106, 0.1)',
        border: 'solid 1px rgba(143, 157, 106, 0.4)'
      }
    }
  }
};
