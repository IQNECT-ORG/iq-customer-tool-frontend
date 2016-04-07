import React, { Component } from 'react';

class PhoneShell extends Component {
  render() {
    return (
      <div className="phone-shell">
        {this.prope.children}
      </div>
    );
  }
};

export default PhoneShell;