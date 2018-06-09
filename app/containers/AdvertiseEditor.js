import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { Button } from "../components";

import { NavigationActions } from "../utils";

@connect()
class AdvertiseEditor extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.type ? '编辑广告' : '新增广告'
  });

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Detail" }));
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: "Account" }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button text="Goto Detail" onPress={this.gotoDetail}/>
        <Button text="Go Back" onPress={this.goBack}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AdvertiseEditor;
