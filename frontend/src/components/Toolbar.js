import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Slider, Icon } from 'react-native-elements';

export default class Toolbar extends Component {
  render() {
    const {
      changeColor,
      changeWidth,
      undo,
      changeToEraser,
      clear,
      drawWidth,
      eraseWidth,
      inDrawingMode,
      back
    } = this.props;
    const colors = [
      'red',
      'black',
      'blue',
      'green',
      'yellow',
      'purple',
      'lightskyblue'
    ];
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ padding: 20 }} onPress={back}>
          <Icon
            name="ios-arrow-back"
            type="ionicon"
            color="#517fa4"
            underlayColor={'#000080'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={back}>
          <Icon
            name="ios-return-left"
            type="ionicon"
            color="#517fa4"
            onPress={undo}
            underlayColor={'#000080'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={back}>
          <Icon
            name="eraser"
            type="font-awesome"
            color="#517fa4"
            onPress={changeToEraser}
            underlayColor={'#000080'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={back}>
          <Icon
            name="ios-trash"
            type="ionicon"
            color="#517fa4"
            onPress={clear}
            underlayColor={'#000080'}
          />
        </TouchableOpacity>
        {colors.map((color, index) => (
          <Button
            style={[styles.circle, { backgroundColor: color }]}
            key={index}
            type="clear"
            onPress={() => {
              changeColor(color);
            }}
          />
        ))}
        <Slider
          value={(inDrawingMode ? drawWidth : eraseWidth) / 100}
          style={{ width: 200 }}
          onValueChange={width => changeWidth(Math.ceil(width * 100 + 1))}
        />
      </View>
    );
  }
}

// 192338 - navy file manager color
// 000080 - old toolbard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#192338'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    margin: 5
  }
});
