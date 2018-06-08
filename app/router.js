import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing, Image } from 'react-native'
import {
  NavigationActions,
  createStackNavigator,
  withNavigationFocus,
} from 'react-navigation'
import {
  initializeListeners,
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Loading from './containers/Loading'
import Login from './containers/Login'
import Detail from './containers/Detail'

import Home from './routes/Home'
import Advertise from './routes/Advertise'
import Promotion from './routes/Promotion'
import Statistics from './routes/Statistics'
import Account from './routes/Account'

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: withNavigationFocus(Home), routerName: 'Hh' },
    Advertise: { screen: withNavigationFocus(Advertise) },
    Promotion: { screen: withNavigationFocus(Promotion) },
    Statistics: { screen: withNavigationFocus(Statistics) },
    Account: { screen: withNavigationFocus(Account) },
  },
  {
    shifting: false,
    labeled: true,
    activeTintColor: '#F44336',
    inactiveTintColor: '#999',
    initialRouteName: 'Home',
    barStyle: {
      backgroundColor: '#fff',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }
)
tabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]
  let title
  switch (routeName) {
    case 'Home':
      title = '首页'
      break
    case 'Advertise':
      title = '编辑广告'
      break
    case 'Promotion':
      title = '我要推广'
      break
    case 'Statistics':
      title = '广告统计'
      break
    case 'Account':
      title = '个人中心'
      break
  }
  return {
    title,
  }
}

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: tabNavigator },
    Detail: { screen: Detail },
  },
  {
    headerMode: 'float',
  }
)

const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login },
  },
  {
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)
const addListener = createReduxBoundAddListener('root')

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentDidMount() {
    initializeListeners('root', this.props.router)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { dispatch, app, router } = this.props
    if (app.loading) return <Loading />

    const navigation = {
      dispatch,
      state: router,
      addListener,
    }
    return <AppNavigator navigation={navigation} />
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default Router
