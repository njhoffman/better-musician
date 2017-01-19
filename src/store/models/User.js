// global orm models
import BaseModel from './BaseModel';

class User extends BaseModel {
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

export default User;

