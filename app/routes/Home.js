import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'antd-mobile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { NavigationActions } from '../utils'
import tabStyles from './TabStyle'

@connect()
class Home extends Component {
  render() {
    return (
      <View style={tabStyles.container}>
        <Icon type="check-circle" color="#07f" />
      </View>
    )
  }
}

Home.navigationOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({ focused, tintColor }) => (
    <MaterialCommunityIcons
      name="home-circle"
      size={26}
      style={{ color: focused ? tintColor : '#999' }}
    />
  ),
}

export default Home
