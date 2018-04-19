export const SET_ENDPOINT_KEYS = "SET_ENDPOINT_KEYS";
export const STORE_CURRENT_ENDPOINT_KEY = "STORE_CURRENT_ENDPOINT_KEY";

export const setEndpointKeys = (endpoints, currentEndpointKey, defaultEndpointKey) =>
  { type: SET_ENDPOINT_KEYS, endpoints, currentEndpointKey, defaultEndpointKey };

export const storeCurrentEndpointKey = (currentEndpointKey) =>
  { type: STORE_CURRENT_ENDPOINT_KEY, currentEndpointKey };


