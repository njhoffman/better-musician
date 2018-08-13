export default {
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
    showPanel: true,
    showChart: false,
    chart: {
      styledActions: {},
      excludedActions: []
    },
    logger: {
      level: 'trace',
      expandObjects: true,
      clearOnReload: true,
      levels: {},
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
