import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ActionButton from 'react-native-action-button';
import {Icon, Drawer, Grid, Button} from 'antd-mobile';

import tabStyles from "./TabStyle";
import Touchable from '../components/Touchable'
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

const Draw = ()=>{
  return(
    <View>
      <Text style={{fontSize:16, marginLeft:10,marginBottom:20}}>文章位置：</Text>
      <Grid
        hasLine={false}
        data={POSITION_LIST.map((_val, i) => ({ text: _val, }))}
        columnNum={2}
        onClick={(_el: any, index: any) => alert(`筛选${POSITION_LIST[index]}`)}
        renderItem={ label => (
          <View style={{borderWidth:1, borderColor:'#ddd', paddingHorizontal:10, paddingVertical:5}}>
            <Text >{label.text}</Text>
          </View>
        )}
        itemStyle={{justifyContent:'center',alignItems:'center',height: 40}}
      />
      <Text style={{fontSize:16, marginLeft:10, marginBottom:20}}>位置类型：</Text>
      <Grid
        hasLine={false}
        data={LINK_LIST.map((_val, i) => ({ text: _val, }))}
        columnNum={3}
        isCarousel
        onClick={(_el: any, index: any) => alert(`筛选${LINK_LIST[index]}`)}
        renderItem={ label => (
          <View style={{borderWidth:1, borderColor:'#ddd', paddingHorizontal:10, paddingVertical:5}}>
            <Text >{label.text}</Text>
          </View>
        )}
        itemStyle={{justifyContent:'center',alignItems:'center',height: 40}}
      />
    </View>
  )
}

@connect()
class Advertise extends Component {
  constructor(argus) {
    super(argus);
    this.state = {
      dataList: Array.from({ length: 10 }).map((d, i) => {
        return createData(i, undefined);
      }),
      isRefreshing: false,
      loadTime: 0, // 模拟下拉加载次数
      edit: false, // 编辑模式
      filter: false, // 是否筛选
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    navigation.setParams({
      changeEdit: this._changeEdit,
      changeFilter: this._changeFilter
    });
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
    const {edit} = this.state;
    return (
      <Drawer
        sidebar={<Draw/>}
        position="right"
        open={this.state.filter}
        drawerRef={(el: any) => (this.drawer = el)}
        onOpenChange={this.onOpenChange}
        drawerBackgroundColor="#fff"
      >
        <View style={[tabStyles.container, styles.container]}>
          <FlatList
            ref={_flatList => this._flatList = _flatList}
            keyExtractor={item => item.id}
            data={this.state.dataList}
            renderItem={({ item }) => <AdvertiseCard {...item} edit={edit} onPress={()=>this._goToEditor(1)}></AdvertiseCard>}
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
            <ActionButton.Item buttonColor='#3498db' onPress={() => this._goToEditor(0)}>
              <Icon type={"\uE692"} color='#fff' style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9b59b6' onPress={this._onEdit}>
              <Icon type={'\uE69F'} color='#fff' style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' onPress={this._onScrollTop }>
              <Icon type={"\uE61A"} color='#fff' style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Drawer>
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
  _changeEdit = ()=>{
    const { navigation } = this.props;
    navigation.setParams({ edit: !this.state.edit });
    this.setState({edit: !this.state.edit})
  };
  _changeFilter = ()=>{
    this.setState({filter: !this.state.filter})
  };

  _onEdit = ()=>{
    const { navigation } = this.props;
    navigation.setParams({ edit: true });
    this.setState({edit: true});
  };

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
      this.setState({
        dataList: Array.from({ length: 10 }).map((d, i) => {
          return createData(i, undefined);
        }),
        loadTime: 0,
      })
    }, 2000);
  };

  _refreshing = () => {
    this.setState({
      isRefreshing: !this.state.isRefreshing
    });
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

Advertise.navigationOptions = props => {
  return {
    tabBarLabel: "广告管理",
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon type={'\uF002'} size={22} color={focused? tintColor : '#999'} />
    ),
  }
};

export default Advertise;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
