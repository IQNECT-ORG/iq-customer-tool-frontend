import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import AllPagesForm from '../../components/organisms/PrintAllPagesForm';
import { changeForm } from 'app/common/actions';
import { getTrainingResults } from 'app/core/selectors/entities/trainingResults';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  const trainingResults = getTrainingResults(state);

  return {
    images: _.map(trainingResults, x => {
      return x.images.default;
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      changeForm: changeForm.bind(null, ownProps.formId)
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    gotoPage: (page) => {
      ownProps.updateUI({
        pageView: 'DETAIL',
        page
      });
    },

    onBackClick: (e) => {
      ownProps.updateUI('step', 0);
    },

    handleSubmit: ownProps.handleSubmit(values => {
      ownProps.updateUI({
        step: 2,
        page: null,
        pageView: null
      });
    }),

    onSwitchViewClick: (e) => {
      ownProps.updateUI({
        pageView: 'DETAIL'
      });
    },

    onAddWebsiteClick: (e) => {
      // dispatch(updateModalPath('addWebsite'));
      // dispatch(updateModalData({
      //   form: 'campaignPrint',
      //   field: 'fallback.url'
      // }));
      // dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      // dispatch(updateModalPath('addCoupon'));
      // dispatch(updateModalData({
      //   form: 'campaignPrint',
      //   field: 'fallback.coupon'
      // }));
      // dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      dispatchProps.actions.changeForm('fallback.url', null);
    },

    onCouponDeleteClick: (e) => {
      dispatchProps.actions.changeForm('fallback.coupon', null);
    },

    onTagsChange: (tags) => {
      dispatchProps.actions.changeForm('fallback.tags', tags);
    }
  });
};

let DecoratedComponent = AllPagesForm;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;