import { normalize, arrayOf } from 'normalizr';
import parser from 'redux-entity-crud/lib/parsers';

const triggerParser = (schema, data, options) => {
  const parsePayload = (item) => {
    const newPayload = [];
    _.each(item.payload, (payload, index) => {
      newPayload.push({
        triggerPayloadId: _.uniqueId(),
        triggerId: item.triggerId,
        index
      });
    });

    item.payload = newPayload;
  };


  if(_.isArray(data)) {
    _.each(data, parsePayload);
  } else {
    parsePayload(data);
  }

  return parser(schema, data);
};

const trainingResultsParser = (schema, data, options) => {
  _.each(data, (item, index) => {
    item.trainingResultId = _.uniqueId();
    item.triggerId = options.triggerId;
    item.frame = index;
  });

  return parser(schema, data);
};

const countParser = (data, options) => {
  return data;
}

export { triggerParser };
export { trainingResultsParser };
export { countParser };