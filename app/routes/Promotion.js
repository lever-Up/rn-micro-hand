import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'antd-mobile'

import { NavigationActions } from '../utils'
import tabStyles from './TabStyle'

@connect()
class Promotion extends Component {
  render() {
    return (
      <View style={tabStyles.container}>
        <Icon type="check-circle" color="#07f" />
      </View>
    )
  }
}

Promotion.navigationOptions = {
  tabBarLabel: '我要推广',
  tabBarIcon: ({ focused, tintColor }) => (
    <Icon type={'\uF003'} size={22} color={focused? tintColor : '#999'} />
  ),
}

export default Promotion
