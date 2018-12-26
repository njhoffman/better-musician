
const styles = (theme) => ({
  container: {
    left: 0,
    top: 0,
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    fontSize: '0.8em',
    overflowY: 'hidden',
    direction: 'ltr',
    // color: 'white',
    padding: '0px',
    backgroundColor: '#000',
    position: 'absolute',
    width: '175px',
    zIndex: 2001,
    border: 'solid 1px #333'
  },
  miniContainer: {
    width: '50px'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: '5px'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width:  'calc(100% - 30px)',
    padding: '5px 15px',
    borderRight: 'solid 1px #333'
  },
  headerMini: {
    display: 'none'
  },
  label: {
    color: '#fdd',
    opacity: 0.7,
    fontSize: '1.2em',
    lineHeight: '1.0em',
    fontVariant: 'all-small-caps'
  },
  value: {
    color: '#a8c5f3'
  },
  exitButtonWrapper: {
    display: 'block',
    zIndex: 1,
    marginBottom: '3px'
  },
  exitButton: {
    display: 'block',
    minHeight: '1.2em !important',
    width: '100%',
    fontWeight: 'bold',
    width: '20px !important',
    padding: '0px !important',
    color: '#bb9999'
  },
  visibilityWrapper: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignContent: 'center'
  },
  expandButtonWrapper: {
    // marginBottom: '5px'
  },
  expandButton: {
    display: 'block',
    width: '20px !important',
    padding: '0px !important',
    // padding: '2px 4px !important'
  },
  dashed: {
    backgroundImage: 'radial-gradient(rgb(51, 55, 58) 0%, rgb(51, 55, 58) 16%, transparent 12%)'
  },
  elements: {
    padding: '5px',
    // display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    overflowX: 'hidden',
    overflowY: 'auto',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  buttonActive: {
    // backgroundColor: '#838184',
    // color: '#0e0e0e'
  },
  buttonWrapper: {
    display: 'block',
    margin: '5px',
  },
  wrapperActivated: {},
  button: { },
  buttonActivated: {
    color: 'white',
    background: 'rgba(0, 60, 40, 1)'
  },
  progressWrapper: {
    marginTop: '5px'
  },
  statusTitle: {
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis'
  },
  statusText: {
    opacity: 0.5,
    fontSize: '0.75em'
  },
  menuHover: {
    backgroundColor: '#464b50 !important',
    // color: '#ffffff !important'
  },
  sublinkOpen: {
    backgroundColor: '#262b30 !important',
    // color: '#ffffff !important'
  },
  menuIconOn: {
    color: '#66bb99',
    position: 'absolute',
    height: '1.3em',
    width: '1.3em',
    right: '2px'
  },
  menuIconOff: {
    position: 'absolute',
    height: '1.3em',
    width: '1.3em',
    right: '2px',
    color: '#666'
  },
  menuTextOn: {
    color: '#fff !important',
  },
  menuTextOff: {
    color: '#666 !important',
  },
  menuIconSubmenu: {
    position: 'absolute',
    height: '1.3em',
    width: '1.3em',
    right: '2px',
    fontWeight: 'bold'
  }

});

export default styles;
