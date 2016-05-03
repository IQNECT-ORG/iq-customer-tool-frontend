import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import Previewer from '../components/previewer/Previewer';
import { createJobRequestAndPollStatusUpdate } from '../actions/previews';

class PreviewerContainer extends Component {

  componentWillMount() {
    this.props.updatePreview();
  }

  componentWillReceiveProps(nextProps) {
    //this.props.updatePreview();
  }

  render() {
    return (
      <Previewer {...this.props}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // const preview = state.entities.getIn(['previews', 'screenshots']).find(x => x.get('url') === 'www.google.com');
  // return {
  //   src: (preview == null) ? undefined : preview.get('image_url')
  // };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePreview: () => {
      // fetch('https://www.browserstack.com/screenshots', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Basic ' + btoa('username:password'),
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     "url": "http://google.com",
      //     "browsers": [
      //       {
      //         "os": "Windows",
      //         "os_version": "7",
      //         "browser_version": "8.0",
      //         "browser": "ie"
      //       }
      //     ]
      //   })
      // });

      dispatch(createJobRequestAndPollStatusUpdate('http://www.google.com/'));
    }
  };
};

let DecoratedComponent = PreviewerContainer;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;