import React, { Component } from 'react';
import { connect } from 'react-redux';
import SummaryForm from '../../components/print/forms/SummaryForm';
import ui from 'redux-ui/transpiled';
import _ from 'lodash';
import { pdfCampaignSummaryFormSubmit } from '../../actions';
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
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
        dispatch(pdfCampaignSummaryFormSubmit({
          values: values,
          updateUI: ownProps.updateUI,
          form: 'campaignPrint',
          resolve,
          reject
        }));
      });
    })
  };
}

let DecoratedComponent = SummaryForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;