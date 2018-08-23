import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const userPointsSelector = ormCreateSelector(orm, (session/*, user */) => {
  const points = session.Song && session.Song.getPointTotal();
  return isNaN(points) ? '0' : points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

const userDisplaySelector = ormCreateSelector(orm, (session, user) => {
  // TODO: load attributes correctly
  const attrs = user.attributes && user.attributes.data
    ? user.attributes.data : user.attributes;
  if (attrs) {
    return attrs.lastName ? `${attrs.lastName}, ${attrs.firstName}` : attrs.email;
  }
});

const maxDifficultySelector = ormCreateSelector(orm, (session/*, user*/) => {
  // set default as 20 if it isn't set
  return session.Song ? session.Song.getMaxDifficulty() : 20;
});

const visualThemeSelector = ormCreateSelector(orm, (session, user) => {
  return (user.attributes && user.attributes.visualTheme ? user.attributes.visualTheme : 'steelBlue-dark');
});

export const userPoints = createSelector(
  ormSelector,
  state => state.user,
  userPointsSelector
);

export const userDisplay = createSelector(
  ormSelector,
  state => state.user,
  userDisplaySelector
);

export const maxDifficulty = createSelector(
  ormSelector,
  state => state.user,
  maxDifficultySelector
);

export const visualTheme = createSelector(
  ormSelector,
  state => state.user,
  visualThemeSelector
);
