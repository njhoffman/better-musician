export default {
  name: __BASENAME__,
  endpoints: {
    default: {
      apiUrl : __API_URL__,
    }
  },
  settings: {
    serverSideRendering : false,
    clientOnly          : true
    // cleanSession:        true
  },
  dev: {
    toolbar: {
      show: true,
      position: {
        y: 100,
        x: 10
      },
      expanded: true
    },
    extension: {
      show: true,
      maxAge: 1000
    },
    inspector: {
      show: false,
      hideMobile: true,
    },
    chart: {
      show: false,
      styledActions: {},
      excludedActions: []
    },
    logger: {
      level: 6, // trace
      colors: {
        trace: '#ccffff',
        debug: '#88ffee',
        info:  '#44aabb',
        log :  '#00aa66',
        warn:  '#aa6622',
        error: '#ff0000',
        fatal: '#ff0000'
      },
      showColors: true,
      expandObjects: true,
      clearOnReload: true,
      logRequests: true,
      logActions: true,
      subsystems: {
        include: [],
        exclude: [],
        colors: []
      },
      actions: {
        include: [],
        exclude: [],
        colors: []
      }
    }
  }
};
