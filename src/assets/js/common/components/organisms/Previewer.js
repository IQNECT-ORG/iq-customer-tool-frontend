import React, { Component } from 'react';
import PhoneShell from './PhoneShell';

class Previewer extends Component {
  render() {
    return (
      <PhoneShell>
        <img src={this.props.src}/>
      </PhoneShell>
    );
  }
};

export default Previewer;