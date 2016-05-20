import { normalize, arrayOf } from 'normalizr';
import parser from 'redux-entity-crud/lib/parsers';

const triggerParser = (schema, data, options) => {
  const parsePayload = (item) => {
    const payload = JSON.parse(item.payload);

    item.payload = _.transform(payload, (result, payload, index) => {
      result.push({
        triggerPayloadId: `${item.triggerId}-${index}`,
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
    item.trainingResultId = `${options.triggerId}-${index}`;
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