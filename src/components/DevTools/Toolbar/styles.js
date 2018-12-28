
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
  infoContainer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  infoRow: {
    width: '100%',
    lineHeight: '1.0', // 1.5
    fontSize: '0.75em',
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
  infoLabel: {
    width: '100%',
    color: '#baa',
    fontSize: '1.2em',
    lineHeight: '1.0em',
    fontVariant: 'all-small-caps'
  },
  infoVal: {
    width: '100%',
    color: '#98b5d3'
  },
  exitButtonWrapper: {
    display: 'block',
    zIndex: 1,
    marginBottom: '3px'
  },
  exitButton: {
    display: 'block',
    minHeight: '1.2em !important',
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
    minHeight: '25px',
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
  menuIconLevelOff: {
    color: '#444444',
    height: '0.8em',
    width: '0.8em',
    float: 'right',
    marginTop: '0.2em',
    marginLeft: '0.8em',
  },
  menuIconLevelOn: {
    color: '#66bb99',
    marginTop: '0.2em',
    marginLeft: '0.8em',
    height: '0.8em',
    width: '0.8em',
    float: 'right'
  },
  menuIconCheck: {
    color: '#66bb99',
    height: '1.2em',
    width: '1.2em',
    marginLeft: '0.4em',
    float: 'right'
  },
  menuIconOn: {
    color: '#66bb99',
    height: '1.2em',
    width: '1.2em',
    marginLeft: '0.4em',
    float: 'right'
  },
  menuIconOff: {
    height: '1.2em',
    width: '1.2em',
    marginLeft: '0.4em',
    float: 'right',
    color: '#666'
  },
  menuIconSubmenu: {
    height: '1.2em',
    width: '1.2em',
    marginLeft: '0.4em',
    float: 'right',
    fontWeight: 'bold'
  },
  menuTextLevelOn: {
    color: '#9aa'
  },
  menuTextLevelSelected: {
    color: '#fff'
  },
  menuTextOn: {
    color: '#fff !important',
  },
  menuTextOff: {
    color: '#666 !important',
  },
});

export default styles;
