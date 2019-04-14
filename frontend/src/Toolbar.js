import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Slider, Icon } from 'react-native-elements';

export default class Toolbar extends Component {
  render() {
    const {
      changeColor,
      changeWidth,
      undo,
      changeToEraser,
      drawWidth,
      eraseWidth,
      inDrawingMode
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
        <Icon
          name="ios-arrow-back"
          type="ionicon"
          color="#517fa4"
          onPress={() => console.log('back pressed')}
          underlayColor={'#000080'}
        />
        <Icon
          name="ios-return-left"
          type="ionicon"
          color="#517fa4"
          onPress={undo}
          underlayColor={'#000080'}
        />
        <Icon
          name="eraser"
          type="font-awesome"
          color="#517fa4"
          onPress={changeToEraser}
          underlayColor={'#000080'}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000080'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    margin: 5
  }
});
