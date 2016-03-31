import React, { Component } from 'react';
import Catalogue from './components/screens/Catalogue';
import CatalogueBrands from './components/screens/CatalogueBrands';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="catalogue" component={Catalogue} key="catalogue"/>,
  <Route path="catalogue/brands" component={CatalogueBrands} key="catalogue/brands"/>
];