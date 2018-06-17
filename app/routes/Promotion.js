import React, { Component } from "react";
import { FlatList, Image, ImageBackground, RefreshControl, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Tabs, List, Icon } from "antd-mobile";
import tabStyles from "./TabStyle";
import { NavigationActions } from "../utils";

const createData = (index, title) => ({
  id: index + title,
  img: "http://p85r1yna2.bkt.clouddn.com/eyun-home.jpg",
  title
});

const tabs = [
  { title: "推荐" },
  { title: "我的" },
  { title: "热点/头条" },
  { title: "财经/房产" },
  { title: "经典美文" },
  { title: "美食/养生" },
  { title: "幽默/搞笑" },
  { title: "科技/互联网" },
  { title: "历史文化" },
  { title: "生活/哲理" },
  { title: "旅行/摄影" },
  { title: "探索/宇宙" },
  { title: "汽车/交通" },
  { title: "科学/教育" },
  { title: "体育/运动" },
  { title: "婚恋/家庭" },
  { title: "育婴" },
  { title: "节日祝福" },
  { title: "时尚娱乐" },
  { title: "职场营销" }
];

@connect()
class Promotion extends Component {
  constructor(args) {
    super(args);
    this.state = {
      isRefreshing: false,
      more: true,
      dataList: Array.from({ length: 10 }).map((d, i) => {
        return createData(i, "推荐");
      })
    };
  }

  _goToWebView(title, url){
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'AdvertiseWeb',
        params:{ title, url }
      })
    )
  };

  render() {
    return (
      <View style={tabStyles.container}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarPosition="top"
          destroyInactiveTab={true}
          tabBarActiveTextColor='#F44336'
          tabBarInactiveTextColor='#888'
          tabBarUnderlineStyle={{ backgroundColor: "#F44336" }}
          onChange={this._onChange}
        >
          {this.renderContent}
        </Tabs>
      </View>
    );
  }

  renderContent = (tab: any, index: any) => {
    return (
      <FlatList
        ref={_flatList => this._flatList = _flatList}
        keyExtractor={item => item.id}
        data={this.state.dataList}
        renderItem={({ item,index }) => this.renderItem(item, tab, index)}
        ListFooterComponent={this.renderListFooter}
        ListHeaderComponent={this.renderListHeader}
        getItemLayout={(data, index) => ({ length: 130, offset: 130 * index, index })}
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
    );
  };

  renderItem = (item, tab, index) => {
    const uri ='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=348052527,689465905&fm=200&gp=0.jpg';
    const link = 'https://m.toutiao.com/i6566497315706634755/';
    return (
      <View>
        <List.Item
          style={styles.contentItem}
          thumb={<Image source={{uri}} style={{width:120,height: 80,marginRight: 20}} resizeMode='cover'/>}
          onClick={() => this._goToWebView(`${tab.title}-${index}`, link)}
        >
          {`${tab.title}-${index}`}
          <List.Item.Brief style={{marginTop:20,marginBottom:10}}>10 小时前</List.Item.Brief>
        </List.Item>
      </View>
    );
  };

  renderListHeader = () => {
    const uri = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=935234897,1465839604&fm=27&gp=0.jpg";
    return <ImageBackground source={{ uri }} style={styles.img} resizeMode='cover'>
      <Text>一些说明文字</Text>
    </ImageBackground>;
  };

  renderListFooter = () => {
    return !this.state.more ? (
      <View style={styles.listFooter}>
        <Text style={styles.listFooterDec}>我是有底线的~</Text>
      </View>
    ) : null;
  };

  _onChange = (tab, index) => {
    this._onRefresh();
    this.setState({
      dataList: Array.from({ length: 10 }).map((d, i) => {
        return createData(i, tab.title);
      }),
      more: true
    });
  };

  _loadMore = () => {
    this.setState({ more: false });
  };

  _refreshing = () => {
    this.setState({
      isRefreshing: !this.state.isRefreshing,
      more: true
    });
  };

  _onRefresh = () => {
    this._refreshing();
    setTimeout(() => {
      this._refreshing();
    }, 2000);
  };
}

Promotion.navigationOptions = {
  tabBarLabel: "我要推广",
  tabBarIcon: ({ focused, tintColor }) => (
    <Icon type={'\uF003'} size={22} color={focused? tintColor : '#999'} />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    height: 100,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: "100%",
    height: 220,
  },
  listFooter: {
    backgroundColor: "#ddd",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  listFooterDec: {
    fontSize: 14,
    color: "#333"
  }
});

export default Promotion;
