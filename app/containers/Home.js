import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'antd-mobile'
import { Button } from '../components'

import { NavigationActions } from '../utils'
import styles from './TabStyle'

@connect()
class Home extends Component {
  // TODO 动画组件Icon 代替图片
  static navigationOptions = {
    title: '首页',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <View style={focused ? styles.activeTab : null}>
        <Image
          style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
          source={require('../images/house.png')}
        />
      </View>
    ),
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text="Goto Detail" onPress={this.gotoDetail} />
        <Icon type="check-circle" color="#07f" />
      </View>
    )
  }
}

export default Home
