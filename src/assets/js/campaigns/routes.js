import React from 'react';
import baseRoutes from './base/routes';
import printRoutes from './print/routes';

export default [
  React.cloneElement(baseRoutes, {
    key: 'campaignsBaseRoutes'
  }),
  React.cloneElement(printRoutes, {
    key: 'campaignsPrintRoutes'
  })
];