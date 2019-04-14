import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Toolbar from './Toolbar';
// import openSocket from 'socket.io-client';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.addPath = this.addPath.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.undo = this.undo.bind(this);
    this.changeToEraser = this.changeToEraser.bind(this);
    //this.socket = openSocket('http://localhost:3000');
    //this.setupSocket();
    this.state = {
      color: 'black',
      drawWidth: 7,
      eraseWidth: 50,
      inDrawingMode: true
    };

    // if (this.props.data) {
    //   this.canvas.current.addPath();
    // }
  }

  componentDidMount() {
    // make call thru socketio
    // addpaths
    // if (this.props.data) {
    //   this.props.data.forEach(path => {
    //     this.canvas.current.addPath(path);
    //   });
    // }
  }

  render() {
    const { color, inDrawingMode, drawWidth, eraseWidth } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 15, flexDirection: 'row' }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={color}
            strokeWidth={inDrawingMode ? drawWidth : eraseWidth}
            onStrokeEnd={this.addPath}
            ref={this.canvas}
          />
        </View>
        <Toolbar
          inDrawingMode={inDrawingMode}
          drawWidth={drawWidth}
          eraseWidth={eraseWidth}
          changeToEraser={this.changeToEraser}
          undo={this.undo}
          changeColor={this.changeColor}
          changeWidth={this.changeWidth}
        />
      </View>
    );
  }

  setupSocket() {
    this.socket;
  }

  undo() {
    this.canvas.current.undo();
  }

  changeColor(color) {
    this.setState({ color, inDrawingMode: true });
  }

  changeToEraser() {
    this.setState({
      color: '#F5FCFF',
      inDrawingMode: false
    });
  }

  changeWidth(newWidth) {
    if (this.state.inDrawingMode) {
      this.setState({ drawWidth: newWidth });
    } else {
      this.setState({ eraseWidth: newWidth });
    }
  }

  addPath(path) {
    console.log(path);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  }
});
