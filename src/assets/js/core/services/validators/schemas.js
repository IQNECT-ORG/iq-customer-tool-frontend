import _ from 'lodash';
import yup from 'yup';

export const campaign = yup.object().shape({
  brandId: yup
    .string()
    .required()
    .label('Brand'),
  name: yup
    .string()
    .required()
    .label('Campaign Title')
});