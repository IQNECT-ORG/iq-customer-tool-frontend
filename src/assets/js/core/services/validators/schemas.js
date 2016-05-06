import _ from 'lodash';
import yup from 'yup';
import Constants from 'app/common/Constants';

export const campaign = yup.object().shape({
  name: yup
    .string()
    .required()
    .label('Campaign Title'),
  defaultBrand: yup
    .string()
    .required()
    .label('Brand'),
});

export const trigger = yup.object().shape({
  searchbarTitle: yup
    .string()
    .required(),
  triggerType: yup
    .number()
    .oneOf(_.values(Constants.TriggerTypes)),
  image: yup
    .mixed()
    .required()
});