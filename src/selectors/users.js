import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const userPointsSelector = ormCreateSelector(orm, (session, user) => {
  const points = session.Song && session.Song.getPointTotal();
  return isNaN(points) ? 0 : points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

export const userPoints = createSelector(
  ormSelector,
  state => state.user,
  userPointsSelector
);

const userDisplaySelector = ormCreateSelector(orm, (session, user) => {
  if (!user || !user.get('attributes')) {
    return "";
  }
  if (user && user.get('attributes').get('lastName')
    || user && user.get('attributes').get('firstName')) {

      return user.get('attributes').get('firstName')
        + ' ' + user.get('attributes').get('lastName');
  } else if (user) {
    return user.get('attributes').get('email');
  }
});

export const userDisplay = createSelector(
  ormSelector,
  state => state.auth.get('user'),
  userDisplaySelector
);

const maxDifficultySelector = ormCreateSelector(orm, (session, user) => {
  return session.Song ? session.Song.getMaxDifficulty() : 0;
});
export const maxDifficulty = createSelector(
  ormSelector,
  state => state.auth.get('user'),
  maxDifficultySelector
);

