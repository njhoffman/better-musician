
const styles = (theme) => ({
  container: {
    left: 0,
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    fontSize: '0.8em',
    overflowY: 'hidden',
    direction: 'ltr',
    color: 'white',
    padding: '0px',
    backgroundColor: '#000',
    opacity: 0.95,
    top: '100px',
    position: 'absolute',
    width: '175px',
    zIndex: 2001,
    border: 'solid 1px #333'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    display: 'flex'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width:  'calc(100% - 30px)',
    padding: '0px 10px',
    borderRight: 'solid 1px #333'
  },
  label: {
    opacity: 0.7,
    fontSize: '1.2em',
    lineHeight: '1.0em',
    fontVariant: 'all-small-caps'
  },
  value: {
    color: '#a8c5f3'
  },
  expandButtonWrapper: {
    display: 'inline-flex',
    width: '40px',
    height: '100%',
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  dashed: {
    backgroundImage: 'radial-gradient(rgb(51, 55, 58) 0%, rgb(51, 55, 58) 16%, transparent 12%)'
  },
  elements: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    overflowX: 'hidden',
    overflowY: 'auto',
    verticalAlign: 'middle',
    alignItems: 'center',
    marginTop: '5px'
  },
  buttonActive: {
    // backgroundColor: '#838184',
    // color: '#0e0e0e'
  },
  buttonWrapper: {
    display: 'block',
    margin: '5px',
    width: '100%'
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
  visible: {
    // backgroundColor: 'red !important'
  },
  menuHover: {
    backgroundColor: '#464b50 !important',
    color: '#ffffff !important'
  },
  sublinkOpen: {
    backgroundColor: '#262b30 !important',
    color: '#ffffff !important'
  },
});

export default styles;
