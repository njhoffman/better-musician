import {
  Iterable, fromJS, List, Map as ImMap, Set as ImSet, OrderedMap, OrderedSet, Stack, Seq
} from 'immutable';

import objType from 'react-json-tree/lib/objType';

function getType(value) {
  if (List.isList(value)) {
    return 'Immutable List';
  } else if (ImMap.isMap(value)) {
    return 'Immutable Map';
  } else if (ImSet.isSet(value)) {
    return 'Immutable Set';
  } else if (OrderedMap.isOrderedMap(value)) {
    return 'Immutable OrderedMap';
  } else if (OrderedSet.isOrderedSet(value)) {
    return 'Immutable OrderedSet';
  } else if (Stack.isStack(value)) {
    return 'Immutable Stack';
  } else if (Seq.isSeq(value)) {
    return 'Immutable Seq';
  }

  return objType(value);
}

function isIterable(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) &&
    typeof obj[window.Symbol.iterator] === 'function';
}


function iterateToKey(obj, key) { // maybe there's a better way, dunno
  let idx = 0;
  for (let entry of obj) {
    if (idx === key) return entry;
    idx++;
  }
}

const entryRegex = /\[entry (\d+)\]/;

export default function getInspectedState(state, path, convertImmutable) {
  state = path && path.length ? {
    [path[path.length - 1]]: path.reduce(
      (s, key) => {
        if (!s) {
          return s;
        }
        if (Iterable.isAssociative(s) || getType(s) === 'Map') {
          if (!s.has(key) && entryRegex.test(key)) {
            const match = key.match(entryRegex);
            const entry = iterateToKey(s, parseInt(match && match[1], 10));
            return entry && {
              '[key]': entry[0],
              '[value]': entry[1]
            };
          }
          return s.get(key);
        } else if (isIterable(s)) {
          return iterateToKey(s, parseInt(key, 10));
        }

        return s[key];
      },
      state
    )
  } : state;

  if (convertImmutable) {
    try {
      state = fromJS(state).toJS();
    } catch(e) {}
  }

  return state;
}
