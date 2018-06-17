import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Button, Icon, ActionSheet } from "antd-mobile";

import { Dropdown, TextField, Touchable, ImagePicker } from "../components";

import { NavigationActions } from "../utils";

/*模拟数据*/
const POSITION_LIST = [{ value: "文章顶部广告" }, { value: "文章内容广告" }, { value: "文章底部广告" }];
const LINK_LIST = [{ value: "微官网" }, { value: "留言板" }, { value: "名片" }, { value: "其他链接" }];

@connect()
class AdvertiseEditor extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.type ? "编辑广告" : "新增广告"
  });

  constructor(args) {
    super(args);
    this.state = {
      remark: "",
      image: null,
    };
  }

  componentWillMount() {
    ImagePicker.clean().then(() => {}).catch(e => {});
  }

  _showActionSheet = () => {
    const BUTTONS = ['拍照', '从相册选择', '从系统库选择'];
    ActionSheet.showActionSheetWithOptions(
      { options: BUTTONS },
      (buttonIndex: any) => {
        if(buttonIndex === 0){
          ImagePicker.openCamera({
            width: 300,
            height: 150,
            cropping: true
          }).then(image => {
            this.setState({
              image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
          }).catch(e => {});
        }else{
          ImagePicker.openPicker({
            width: 300,
            height: 150,
            cropping: true
          }).then(image => {
            this.setState({
              image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
          }).catch(e => {});
        }
      },
    );
  };

  render() {
    const { type } = this.props.navigation.state.params || {};
    return (
      <View style={styles.container}>
        <Touchable onPress={this._showActionSheet}>
          {
            this.state.image ?
              <Image style={styles.img} source={this.state.image} />:
              (
                !type ?
                  <View style={styles.imgPicker}>
                    <Icon type={"\uE645"} color='#F44336'></Icon>
                    <Text style={{ marginLeft: 10, color: "#F44336" }}>添加广告</Text>
                  </View> :
                  <View style={styles.imgPicker}>
                    <Image source={{ uri: "http://p85r1yna2.bkt.clouddn.com/eyun-home.jpg" }} style={styles.img} />
                  </View>
              )
          }
        </Touchable>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ marginVertical: 10, color: "#ddd" }}>建议图片尺寸：500 x 200</Text>
        </View>
        <View>
          <Dropdown tintColor='orange' label='广告位置' data={POSITION_LIST}/>
          <Dropdown tintColor='orange' label='连接类型' data={LINK_LIST}/>
        </View>
        <View>
          <Text style={{ marginVertical: 10, color: "#F44336" }}>已连接到您的微官网，完善信息请返回首页-微官网</Text>
        </View>
        <View>
          <TextField
            label='广告备注'
            tintColor='orange'
            value={this.state.remark}
            onChangeText={(remark) => this.setState({ remark })}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Button type="warning">保 存</Button>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  imgPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ddd",
    height: 200,
    borderRadius: 0.5
  },
  img: {
    height: 200,
    width: "100%",
    resizeMode: "cover"
  }
});

export default AdvertiseEditor;
