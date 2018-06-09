import { StyleSheet } from 'react-native'

/**
 * Tab 底部公共样式
 * */
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  activeTab: {
    transform: [{ scale: 1.2 }],
  },
  icon: {
    width: 32,
    height: 32,
  },
})
