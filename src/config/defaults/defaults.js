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
    showInspector: false,
    showChart: false,
    showToolbar: true,
    showExtension: true,
    extensionOptions: {
      maxAge: 1000
    },
    inspectorOptions: {
      hideMobile: true,
    },
    chartOptions: {
      styledActions: {},
      excludedActions: []
    },
    loggerOptions: {
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
