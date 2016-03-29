import React, { Component } from 'react';
import { Link } from 'react-router';

class QuickActions extends Component {
  render() {
    return (
      <div>
        <Link to="/">Notications</Link>
        <Link to="/">Settings</Link>
      </div>
    );
  }
};

export default QuickActions;