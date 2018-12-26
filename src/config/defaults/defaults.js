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
      expandObjects: true,
      clearOnReload: true,
      logRequests: true,
      colors: true,
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
