import { orm } from 'store/reducers';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const userPointsSelector = ormCreateSelector(orm, (session, user) => {
  const points = session.Song && session.Song.getPointTotal();
  return isNaN(points) ? '0' : points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

export const userPoints = createSelector(
  ormSelector,
  state => state.user,
  userPointsSelector
);

const userDisplaySelector = ormCreateSelector(orm, (session, user) => {
  let userName = '';
  if (user && user.get('attributes')) {
    userName += user.get('attributes').get('firstName')
      ? user.get('attributes').get('firstName') + ' ' : '';
    userName += user.get('attributes').get('lastName')
      ? user.get('attributes').get('lastName') : '';
    if (userName.length === 0) {
      userName = user.get('attributes').get('email');
    }
  }
  return userName;
});

export const userDisplay = createSelector(
  ormSelector,
  state => state.auth ? state.auth.get('user') : false,
  userDisplaySelector
);

const maxDifficultySelector = ormCreateSelector(orm, (session, user) => {
  // set default as 20 if it isn't set
  return session.Song ? session.Song.getMaxDifficulty() : 20;
});
export const maxDifficulty = createSelector(
  ormSelector,
  state => state.auth.get('user'),
  maxDifficultySelector
);

const visualThemeSelector = ormCreateSelector(orm, (session, user) => {
  return (user && user.get('attributes') && user.get('attributes').get('visualTheme')
    ? user.get('attributes').get('visualTheme') : 'steelBlue-dark');
});

export const visualTheme = createSelector(
  ormSelector,
  state => state.auth ? state.auth.get('user') : false,
  visualThemeSelector
);
