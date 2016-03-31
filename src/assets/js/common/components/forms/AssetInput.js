import React, { Component } from 'react';

class AssetInput extends Component {
  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={this.handleBrowseClick.bind(this)}>Test</button>
        </div>
        <input type="file" ref="input" onClick={this.props.onClick} onChange={this.props.onChange}/>
      </div>
    );
  }

  handleBrowseClick(e) {
    this.refs.input.click();
  }
};

export default AssetInput;