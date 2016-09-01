import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SummaryForm from '../../components/organisms/PrintSummaryForm';
import ui from 'redux-ui';
import _ from 'lodash';
import { campaignPDFSummaryFormSubmit } from '../../signals';
//import { updateTrigger } from 'app/common/actions/triggers';
//import { getTriggers } from 'app/core/selectors/entities/triggers';
//import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  const pages = ownProps.values.pages;

  const diff = _.reduce(pages, (result, page, index) => {
    if(page.url || page.coupon) {
      result.push({
        index,
        url: page.url,
        coupon: page.coupon,
        tags: page.tags
      });

      return result;
    }

    return result;
  }, []);

  return {
    pages: diff
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      campaignPDFSummaryFormSubmit
      //changeForm: changeForm.bind(null, ownProps.formKey)
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    gotoPage: (page) => {
      ownProps.updateUI({
        pageView: 'DETAIL',
        page,
        step: 1
      });
    },

    onBackClick: e => {
      ownProps.updateUI({
        step: 1,
        pageView: 'DETAIL',
        page: 0
      });
    },

    onSubmit: ownProps.handleSubmit((values) => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.campaignPDFSummaryFormSubmit({
          values: values,
          updateUI: ownProps.updateUI,
          form: ownProps.formKey,
          resolve,
          reject
        });
      });
    })
  });
};

let DecoratedComponent = SummaryForm;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;