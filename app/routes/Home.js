import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'antd-mobile'

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
    <Icon type={'\uF001'} size={22} color={focused? tintColor : '#999'} />
  ),
}

export default Home
