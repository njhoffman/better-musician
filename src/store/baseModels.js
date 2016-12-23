// global orm models

import {fk, many, Model} from 'redux-orm';

class User extends Model {
  static reducer(state, action, User, session) {
    const { payload, type } = action;
    switch (type) {
      default:
        break;
    }
  }
  toString() {
    return `This: ${this}`;
  }
}

User.modelName = 'User';
User.fields = {
};

User.shallowFields = {
};

export const models = [
  User
];
export default models;

