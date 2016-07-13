import React, { Component } from 'react';
import { Link } from 'react-router';

class QuickActions extends Component {
  render() {
    return (
      <div className="draw-nav__quick-actions">
        <Link to="/"><i className="icons8-appointment-reminders"/></Link>
        <Link to="/"><i className="icons8-settings"/></Link>
      </div>
    );
  }
};

export default QuickActions;