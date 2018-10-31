import { orm } from 'store/orm';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const savedFieldsSelector = ormCreateSelector(orm, (session, user) => session.CustomField.all().toModelArray());

export const savedFields = createSelector(
  ormSelector,
  state => state.user,
  savedFieldsSelector
);

const savedTabsSelector = ormCreateSelector(orm, (session, user) => {
  const tabs = {};
  session.CustomField.all()
    .toModelArray()
    .forEach(field => {
      if (tabs[field.tabName]) {
        tabs[field.tabName].push(field);
      } else {
        tabs[field.tabName] = [field];
      }
    });
  const ret = [];
  Object.keys(tabs).forEach((tabKey, idx) => {
    ret.push({ name: tabKey, fields: tabs[tabKey], idx });
  });
  return ret;
});

export const savedTabs = createSelector(
  ormSelector,
  state => state.user,
  savedTabsSelector
);
