import { loadConfig } from 'actions/config';
import { configure as authConfigure } from 'actions/auth/configure';
import { humanMemorySize } from 'shared/util';
import { init as initLog } from 'shared/logger';
const { debug } = initLog('app');

export const loadAppConfig = (store) => {
  return store.dispatch(
    loadConfig({
      api: {
        url: __API_URL__
      }
    })
  );
};

export const loadAuthConfig = (store) => {
  return store.dispatch(
    authConfigure({
      apiUrl                : __API_URL__,
      signOutPath           : '/users/logout',
      emailSignInPath       : '/users/login',
      emailRegistrationPath : '/users/register',
      accountUpdatePath     : '/users/update',
      accountDeletePath     : '/users/delete',
      passwordResetPath     : '/users/password_reset',
      passwordUpdatePath    : '/users/password_update',
      tokenValidationPath   : '/users/validate_token',
      authProviderPaths     : {
        github   : '/users/login/github',
        facebook : '/users/login/facebook',
        google   : '/users/login/google_oauth2'
      }
    }, {
      serverSideRendering : false,
      clientOnly          : true
      // cleanSession:        true
    }
    )
  );
};

let lastHeapSize = 0;
export const startMemoryStats = (interval = 10000) => {
  const memoryStats = () => {
    if (window.performance && window.performance.memory) {
      const { totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
      const used = humanMemorySize(usedJSHeapSize, true);
      const total = humanMemorySize(totalJSHeapSize, true);
      if (Math.abs(usedJSHeapSize - lastHeapSize) > 10485760) {
        debug(`-- JS Heap Size: ${used} / ${total} ${usedJSHeapSize} ${lastHeapSize}`);
        lastHeapSize = usedJSHeapSize;
      }
    }
  };
  setTimeout(memoryStats, interval);
};

export const domStats = () => {
  let stats = { maxDepth: 0, totalNodes: 0, totalDepth: 0 };
  const getNodeStats = (el, depth) => {
    stats.maxDepth = depth > stats.maxDepth ? depth : stats.maxDepth;
    stats.totalNodes++;
    stats.totalDepth += depth;
    let i;
    for (i = 0; i < el.children.length; i++) {
      getNodeStats(el.children[i], depth + 1);
    }
  };
  getNodeStats(document, 0);
  stats.averageDepth = (stats.totalDepth / stats.totalNodes).toFixed(2);
  debug(`-- depth => ${stats.averageDepth} / ${stats.maxDepth} : ${stats.totalNodes} Nodes`);
};
