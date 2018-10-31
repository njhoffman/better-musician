import _ from 'lodash';

export default (endpoints, defaultEndpointKey = null) => {
  const allEndpoints = {};
  let defEndKey = defaultEndpointKey || _.first(_.keys(endpoints));
  _.keys(endpoints).forEach((key, i) => {
    if (i === 0 && !defEndKey) {
      defEndKey = key;
    }

    allEndpoints[key] = { ...endpoints[defEndKey], ...endpoints[key] };
    if (endpoints[key].extends) {
      _.merge(allEndpoints[key], endpoints[endpoints[key].extends]);
    }
  });

  return {
    defaultEndpointKey: defEndKey,
    currentEndpoints: allEndpoints
  };
};
