import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default (props) => {
  return (
    <div className="loader">
      <div className="loader__content">
        <ReactCSSTransitionGroup
          component="div"
          transitionName="come"
          transitionAppear={true}
          transitionAppearTimeout={750}
          transitionEnter={false}
          transitionLeave={false}>
          <div>
            <div className="loader__backing">
              <img src="/assets/images/loader-circles.png"/>
            </div>
            <div className="loader__logo">
              <img src="/assets/images/short-logo.svg"/>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};