import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageDetailsForm from '../../components/organisms/PrintPageDetailsForm';
import ui from 'redux-ui';
import { changeForm } from 'app/common/actions';
import { getTrainingResults } from 'app/core/selectors/entities/trainingResults';
import _ from 'lodash';
import Constants, { ModalPaths } from 'app/common/Constants'; 'app/common/Constants';
import { modalOpen } from 'app/modal/signals';

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
      changeForm: changeForm.bind(null, ownProps.formId),
      modalOpen
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
      dispatchProps.actions.modalOpen({
        path: ModalPaths.WEBSITE_ADD,
        data: {
          form: ownProps.formId,
          field: `pages[${ownProps.ui.page}].url`
        }
      });
    },

    onAddCouponClick: (e) => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.COUPON_ADD,
        data: {
          form: ownProps.formId,
          field: `pages[${ownProps.ui.page}].couponId`
        }
      });
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