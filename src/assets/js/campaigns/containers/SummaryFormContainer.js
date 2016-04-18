import React, { Component } from 'react';
import { connect } from 'react-redux';
import SummaryForm from '../components/forms/SummaryForm';
import ui from 'redux-ui/transpiled';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  const pages = ownProps.values.pages;

  const diff = _.reduce(pages, (result, page, index) => {
    if(page.website || page.coupon) {
      result.push({
        index,
        website: page.website,
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
        pageView: 'ALL',
        page: 1
      });
    }
  };
}

let DecoratedComponent = SummaryForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;