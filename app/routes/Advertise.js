import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ActionButton from 'react-native-action-button';
import {Icon} from 'antd-mobile';

import tabStyles from "./TabStyle";

import AdvertiseCard from "../components/AdvertiseCard";
import { NavigationActions } from "../utils";

/*模拟数据*/
const POSITION_LIST = ["文章顶部广告", "文章内容广告", "文章底部广告"];
const LINK_LIST = ["微官网", "留言板", "名片", "其他链接"];

const createData = (index, onPress) => ({
  id: index + "",
  img: "http://p85r1yna2.bkt.clouddn.com/eyun-home.jpg",
  position: POSITION_LIST[parseInt(index % 3)],
  linkType: LINK_LIST[parseInt(index % 3)],
  clickTimes: parseInt(index * Math.random() * 100),
  showTimes: parseInt(index * Math.random() * 100),
  onPress
});

@connect()
class Advertise extends Component {
  constructor(argus) {
    super(argus);
    this.state = {
      dataList: Array.from({ length: 10 }).map((d, i) => {
        return createData(i, undefined);
      }),
      isRefreshing: false,
      loadTime: 0
    };
  }

  renderListFooter = () => {
    const { loadTime } = this.state;
    if (loadTime === 3) {
      return (
        <View style={styles.listFooter}>
          <Text style={styles.listFooterDec}>快去编辑更多广告吧~</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View style={[tabStyles.container, styles.container]}>
        <FlatList
          ref={_flatList => this._flatList = _flatList}
          keyExtractor={item => item.id}
          data={this.state.dataList}
          renderItem={({ item }) => <AdvertiseCard {...item}></AdvertiseCard>}
          ListFooterComponent={this.renderListFooter}
          getItemLayout={(data, index) => ({ length: 120, offset: 120 * index, index })}
          onEndReachedThreshold={0.1}
          onEndReached={this._loadMore}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={["#F44336"]}
            />
          }
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#3498db' onPress={() => this._goToEditor(1)}>
            <Icon type={"\uE692"} color='#fff' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' onPress={() => this._goToEditor(0)}>
            <Icon type={'\uE69F'} color='#fff' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' onPress={this._onScrollTop }>
            <Icon type={"\uE61A"} color='#fff' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }

  /************* 路由转跳 **************/
  _goToEditor(type){
    // type: 0、1 新增\编辑
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'AdvertiseEditor',
        params:{ type }
      })
    )
  };

  /************* 事件 **************/
  _onScrollTop = ()=>{
    this._flatList.scrollToOffset({
      animated: true,
      offset: 0
    });
  };

  _onRefresh = () => {
    this._refreshing();
    setTimeout(() => {
      this._refreshing();
    }, 2000);
  };

  _refreshing = () => {
    this.setState({ isRefreshing: !this.state.isRefreshing });
  };

  _loadMore = () => {
    this._onRefresh();
    let { loadTime, dataList } = this.state;
    if (loadTime === 3) {
      return;
    }
    loadTime++;
    for (let i = loadTime * 10; i < (loadTime + 1) * 10; i++) {
      dataList.push(createData(i, null));
    }
    this.setState({ loadTime, dataList });
  };
}

Advertise.navigationOptions = {
  tabBarLabel: "广告管理",
  tabBarIcon: ({ focused, tintColor }) => (
    <MaterialCommunityIcons
      name="xing-circle"
      size={26}
      style={{ color: focused ? tintColor : "#999" }}
    />
  ),
};

export default Advertise;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  listFooter: {
    backgroundColor: "#ddd",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  listFooterDec: {
    fontSize: 14,
    color: '#333'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
