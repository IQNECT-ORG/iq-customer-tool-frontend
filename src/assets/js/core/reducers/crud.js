import Immutable from 'immutable';
import _ from 'lodash';

export const create = (state, action, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  if(_.isArray(action.payload) === true) {
    return state.merge(Immutable.fromJS(_.keyBy(action.payload, idKey)));
  }

  return state.merge(Immutable.fromJS({ [action.payload[idKey]]: action.payload }));
};

export const read = (state, action, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  if(_.isArray(action.payload) === true) {
    return state.merge(Immutable.fromJS(_.keyBy(action.payload, idKey)));
  }

  return state.merge(Immutable.fromJS({ [action.payload[idKey]]: action.payload }));
};

export const update = (state, action, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  if(_.isArray(action.payload) === true) {
    return state.merge(Immutable.fromJS(_.keyBy(action.payload, idKey)));
  }

  return state.merge(Immutable.fromJS({ [action.payload[idKey]]: action.payload }));
};

export const del = (state, action, idKey = 'id') => {
  if(action.error === true) {
    return state;
  }

  if(_.isArray(action.payload) === true) {
    let ids = _.map(action.payload, idKey);

    return state.filterNot(entity => {
      const id = entity.get(idKey);
      return _.includes(ids, id);
    });
  }

  return state.delete(action.payload[idKey]);
};


const crudReducer = (reducer, config) => {
  return (state, action) => {

    if(state == null) {
      return reducer(state, action);
    }

    switch(action.type) {
      case config.create:
        return create(state, action, config.idKey);
      case config.read:
        return read(state, action, config.idKey);
      case config.update:
        return update(state, action, config.idKey);
      case config.delete:
        return del(state, action, config.idKey);
    }

    return reducer(state, action);
  };
};

export default crudReducer;