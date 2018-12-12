import { orm } from 'store/orm';
import { sortBy } from 'lodash';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { createSelector } from 'reselect';

export const ormSelector = state => state.orm;

const savedFieldsSelector = ormCreateSelector(orm, (session, user) => session.Field.all().toModelArray());

export const savedFields = createSelector(
  ormSelector,
  state => state.user,
  savedFieldsSelector
);

const userTabsSelector = ormCreateSelector(orm, (session, currentSong) => {
  // TODO: implement sorting capability, for now just sort by creation order
  const tabs = session.FieldTab.all()
    .toModelArray()
    .map(({
      fields,
      sortedFields,
      sortedRows,
      name,
      id,
      ...props
    }) => ({
      name,
      id,
      fields: fields.toModelArray(),
      sortedFields,
      sortedRows,
      ...props
    }));

  // add primary tab
  tabs.unshift({
    locked: true,
    id: -1,
    name: 'Main Fields'
  });
  return sortBy(tabs, 'id')
    .map((tab, tabIdx) => ({
      ...tab, tabIdx
    }));
});
//

export const userTabs = createSelector(
  ormSelector,
  state => state.user,
  userTabsSelector
);

const previewFieldSelector = ormCreateSelector(orm, (session, id) => (
  session.Field.idExists(id)
    ? session.Field.get({ id })
    : {}
));

export const previewField = createSelector(
  ormSelector,
  state => state.ui.modal.meta.id,
  previewFieldSelector
);

const editFieldSelector = ormCreateSelector(orm, (session, id) => (
  session.Field.idExists(id)
    ? session.Field.get({ id })
    : {}
));

export const editField = createSelector(
  ormSelector,
  state => state.ui.modal.meta.id,
  editFieldSelector
);
