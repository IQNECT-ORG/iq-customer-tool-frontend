import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageDetailsForm from '../../components/organisms/PrintPageDetailsForm';
import ui from 'redux-ui';
import { changeForm } from 'app/common/actions';
import { getTrainingResults } from 'app/core/selectors/entities/trainingResults';
import _ from 'lodash';
import Constants from 'app/common/Constants';

const mapStateToProps = (state, ownProps) => {
  const trainingResults = getTrainingResults(state);
  const page = ownProps.ui.page;
  const pageCount = ownProps.values.pages.length;
  const trainingResult = _.find(trainingResults, x => x.frame === page);

  return {
    imageSrc: trainingResult.images.default,
    isTrained: trainingResult.status === Constants.TrainingResultStatuses.OK,
    page,
    pageCount,
    hasPrev: page > 0,
    hasNext: page < pageCount - 1
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      changeForm: changeForm.bind(ownProps.formKey)
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onBackClick: (e) => {
      ownProps.updateUI({
        step: 0,
        page: null
      });
    },

    handleSubmit: ownProps.handleSubmit((values) => {
      ownProps.updateUI({
        step: 2,
        page: null
      });
    }),

    onSwitchViewClick: (e) => {
      ownProps.updateUI({
        pageView: 'ALL'
      });
    },

    onPrevPageClick: (e) => {
      ownProps.updateUI({
        page: ownProps.ui.page - 1
      });
    },

    onNextPageClick: (e) => {
      ownProps.updateUI({
        page: ownProps.ui.page + 1
      });
    },

    onAddWebsiteClick: (e) => {
    //   dispatch(updateModalPath('addWebsite'));
    //   dispatch(updateModalData({
    //     form: 'campaignPrint',
    //     field: `pages[${ownProps.ui.page}].url`
    //   }));
    //   dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      // dispatch(updateModalPath('addCoupon'));
      // dispatch(updateModalData({
      //   form: 'campaignPrint',
      //   field: `pages[${ownProps.ui.page}].coupon`
      // }));
      // dispatch(openModal());
    },

    onWebsiteDeleteClick: () => {
      dispatchProps.actions.changeForm(`pages[${ownProps.ui.page}].url`, null);
    },

    onTagsChange: (tags) => {
      dispatchProps.actions.changeForm(`pages[${ownProps.ui.page}].tags`, tags);
    }
  });
};

let DecoratedComponent = PageDetailsForm;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;