import { normalize, arrayOf } from 'normalizr';
import parser from 'redux-entity-crud/lib/parsers';

const triggerParser = (schema, data, options) => {
  const parsePayload = (item) => {
    const payload = JSON.parse(item.payload);

    item.payload = _.transform(payload, (result, payload, index) => {
      result.push({
        triggerPayloadId: _.uniqueId(),
        triggerId: item.triggerId,
        index,
        data: payload
      });
    }, []);
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