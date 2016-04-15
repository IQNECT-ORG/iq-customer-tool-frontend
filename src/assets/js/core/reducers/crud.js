import Immutable from 'immutable';
import _ from 'lodash';

export const create = (state, action, path, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  return state.merge(Immutable.fromJS(_.get(action, path)));
};

export const read = (state, action, path, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  return state.merge(Immutable.fromJS(_.get(action, path)));
};

export const update = (state, action, path, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  return state.merge(Immutable.fromJS(_.get(action, path)));
};

export const del = (state, action, path, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  return state.filterNot(entity => {
    const id = entity.get(idKey);
    return _.includes(ids, id);
  });
};


const crudReducer = (reducer, config) => {
  return (state, action) => {

    if(state == null) {
      return reducer(state, action);
    }

    switch(action.type) {
      case config.create:
        return create(state, action, config.path, config.idKey);
      case config.read:
        return read(state, action, config.path, config.idKey);
      case config.update:
        return update(state, action, config.path, config.idKey);
      case config.delete:
        return del(state, action, config.path, config.idKey);
    }

    return reducer(state, action);
  };
};

export default crudReducer;