import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import RefinancingRates from './RefinancingRates';
import ExRates from './ExRates';

const Menu = createDrawerNavigator({
  RefinancingRates: {
    screen: RefinancingRates,
  },
  ExRates: {
    screen: ExRates,
  },
});

export default createAppContainer(Menu);
