import CouponForm from '../../components/organisms/CouponForm';
import { reduxForm } from 'redux-form';

const FORM_KEY = 'couponForm';
const fields = ['artwork', 'couponName', 'discountCode', 'url'];

let DecoratedComponent = CouponForm;
DecoratedComponent = reduxForm({
  form: FORM_KEY,
  fields
})(DecoratedComponent);

export default DecoratedComponent;