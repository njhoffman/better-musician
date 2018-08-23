import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const savedFieldsSelector = ormCreateSelector(orm, (session, user) => {
  return session.CustomField.all().toModelArray();
});

export const savedFields = createSelector(
  ormSelector,
  state => state.user,
  savedFieldsSelector
);

const savedTabsSelector = ormCreateSelector(orm, (session, user) => {
  let tabs = {};
  session.CustomField.all().toModelArray().forEach(field => {
    if (tabs[field.tabName]) {
      tabs[field.tabName].push(field);
    } else {
      tabs[field.tabName] = [field];
    }
  });
  let ret = [];
  Object.keys(tabs).forEach(tabKey => {
    ret.push({ name: tabKey, fields: tabs[tabKey] });
  });
  return ret;
});

export const savedTabs = createSelector(
  ormSelector,
  state => state.user,
  savedTabsSelector
);
