import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const userPointsSelector = ormCreateSelector(orm, (session, user) => {
  const points = session.Song && session.Song.getPointTotal();
  return isNaN(points) ? '0' : points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

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

const maxDifficultySelector = ormCreateSelector(orm, (session, user) => {
  // set default as 20 if it isn't set
  return session.Song ? session.Song.getMaxDifficulty() : 20;
});

const visualThemeSelector = ormCreateSelector(orm, (session, user) => {
  return (user && user.get('attributes') && user.get('attributes').get('visualTheme')
    ? user.get('attributes').get('visualTheme') : 'steelBlue-dark');
});

export const userPoints = createSelector(
  ormSelector,
  state => state.user,
  userPointsSelector
);

export const userDisplay = createSelector(
  ormSelector,
  state => state.auth ? state.auth.get('user') : false,
  userDisplaySelector
);

export const maxDifficulty = createSelector(
  ormSelector,
  state => state.auth ? state.auth.get('user') : false,
  maxDifficultySelector
);

export const visualTheme = createSelector(
  ormSelector,
  state => state.auth ? state.auth.get('user') : false,
  visualThemeSelector
);
