import React, { Component } from 'react';

class PhoneShell extends Component {
  render() {
    return (
      <div className="phone-shell">
        <div className="phone-shell__window">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default PhoneShell;