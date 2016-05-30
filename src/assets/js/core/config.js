import _ from 'lodash';

const base = {


};

const envs = {
  lcl: _.merge({}, base, {
    API_ROOT: 'https://iq.api/api'
  }),
  dev: _.merge({}, base, {

  }),
  prd: _.merge({}, base, {

  })
};

export default envs[__ENV__];