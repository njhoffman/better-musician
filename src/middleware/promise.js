/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */

export default (store) => next => action => {
  if (!action.promise) {
    return next(action);
  }

  function makeAction(ready, data) {
    let newAction = Object.assign({}, action, { ready }, data);
    delete newAction.promise;
    return newAction;
  }

  next(makeAction(false));
  return action.promise
    .then(
      result => next(makeAction(true, { result } )),
      error => {
        console.error("Middleware Promise Error:", error);
        return next(makeAction(true, { error } ));
      }
    );
}

