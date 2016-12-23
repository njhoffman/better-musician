import { ORM as Schema } from 'redux-orm';
import baseModels from './model';

let orm;

export const register = (models) => {
  orm = orm || new Schema();
  orm.register(...models);
  return orm;
};

// TODO: figure out a way to return new schema without function invocation
export const get = () => {
  return orm;
}

