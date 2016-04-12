import React from 'react';
import baseRoutes from './base/routes';
import printRoutes from './print/routes';

export default [
  baseRoutes,
  React.cloneElement(printRoutes, {
    key: 'campaignsPrintRoutes'
  })
];