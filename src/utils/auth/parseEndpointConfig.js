import _ from 'lodash';

export default (endpoints, defaultEndpointKey = null) => {
  const allEndpoints = {};
  if (!defaultEndpointKey) {
    defaultEndpointKey = _.first(_.keys(endpoints));
  }
  _.keys(endpoints).forEach((key, i) => {
    if (i === 0 && !defaultEndpointKey) {
      defaultEndpointKey = key;
    }

    allEndpoints[key] = { ...endpoints[defaultEndpointKey], ...endpoints[key] };
    if (endpoints[key].extends) {
      _.merge(allEndpoints[key], endpoints[endpoints[key].extends]);
    }
  });

  return { defaultEndpointKey, currentEndpoints: allEndpoints };
};
