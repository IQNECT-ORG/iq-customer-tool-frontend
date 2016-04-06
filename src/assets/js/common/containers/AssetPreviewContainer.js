import React, { Component } from 'react';
import AssetPreview from '../components/AssetPreview';
import ui from 'redux-ui/transpiled';

class AssetPreviewContainer extends Component {

  componentWillMount() {
    this.updateSrc(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.src !== this.props.src) {
      this.updateSrc(nextProps.src);
    }
  }

  updateSrc(src) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.props.updateUI('parsedSrc', reader.result);
    };
    reader.readAsDataURL(src);
  }

  render() {
    return (
      <AssetPreview src={this.props.ui.parsedSrc}/>
    );
  }
}

let DecoratedComponent = ui({
  state: {
    parsedSrc: null
  }
})(AssetPreviewContainer);

export default DecoratedComponent;