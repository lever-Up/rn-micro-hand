import React, { PureComponent } from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { withNavigationFocus } from 'react-navigation'

import Home from './containers/Home'
import Account from './containers/Account'

// 路由
const TabRouter = {
  Home: { screen: withNavigationFocus(Home) },
  Account: { screen: withNavigationFocus(Account) },
  Home1: { screen: withNavigationFocus(Home) },
  Account1: { screen: withNavigationFocus(Account) },
  Home2: { screen: withNavigationFocus(Home) },
}

export default createMaterialBottomTabNavigator(TabRouter, {
  shifting: false,
  labeled: true,
  activeTintColor: '#F44336',
  inactiveTintColor: '#333',
  initialRouteName: 'Home',
  barStyle: {
    backgroundColor: '#fff',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
