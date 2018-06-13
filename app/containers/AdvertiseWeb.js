import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, WebView } from "react-native";
import { connect } from "react-redux";
import { Touchable, HeaderButtons, ImagePicker } from "../components";
import {Icon, ActionSheet} from 'antd-mobile'

const options = [
  { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
  { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
  { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
  { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
  { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
].map(obj => ({
  icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
  title: obj.title,
}));

showShareActionSheet = () => {
  ActionSheet.showShareActionSheetWithOptions({
      options,
      message: '分享'
    }, (buttonIndex) => {
    });
};

@connect()
class AdvertiseWeb extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerRight: (
      <Touchable style={{marginRight: 20}} onPress={showShareActionSheet}>
          <Icon type={'\uE671'} />
      </Touchable>
    ),
  });

  constructor(args) {
    super(args);
    this.state = {
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: false,
    };
  }

  render() {
    const { url } = this.props.navigation.state.params || {};
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
      </View>
    );
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      scalesPageToFit: true
    });
  };

  onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webView:{
    flex: 1,
    width: Dimensions.get('window').width
  }
});

export default AdvertiseWeb;
