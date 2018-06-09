import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Icon, SwipeAction } from "antd-mobile";

import Touchable from "./Touchable";

const TextLine = ({ desc, content, inline }) => (
  <View style={styles.textLine}>
    <Text>{desc}</Text>
    <Text>{content}</Text>
  </View>
);

const right = [
  {
    text: <Icon color='#9b59b6' type={`\uE671`}></Icon>,
    onPress: () => console.log('more'),
    style: { color: 'white' },
  },
  {
    text: <Icon color='#1abc9c' type={`\uE69F`}></Icon>,
    onPress: () => console.log('delete'),
    style: { color: 'white' },
  },
];

export const AdvertiseCard = ({ img, position, linkType, clickTimes, showTimes, style, onPress }) => (
  <SwipeAction
    autoClose
    style={{ backgroundColor: "transparent" }}
    right={right}
    onOpen={() => console.log("open")}
    onClose={() => console.log("close")}
  >
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: img }} style={styles.img}></Image>
        <View>
          <View style={styles.textLine}>
            <Icon size={14} style={styles.link} type={`\uE65B`}></Icon>
            <Text style={styles.linkTitle}>{linkType}</Text>
          </View>
          <View>
            <TextLine desc='位置：' content={position}/>
          </View>
          <View>
            <TextLine desc='展示次数：' content={showTimes} inline/>
            <TextLine desc='点击次数：' content={clickTimes} inline/>
          </View>
        </View>
      </View>
    </Touchable>
  </SwipeAction>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "center"
  },
  card: {
    alignItems: "center",
    flexDirection: "row"
  },
  img: {
    width: 170,
    height: 100,
    marginRight: 20,
    resizeMode: "cover",
    borderRadius: 8,
    backgroundColor: "#eee"
  },
  textLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  link: {
    color: "#ccc",
    marginRight: 5
  },
  linkTitle: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333"
  }
});

export default AdvertiseCard;
