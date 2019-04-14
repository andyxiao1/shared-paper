import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Toolbar from '../components/Toolbar';
import {
  subscribeToCanvas,
  addPathToCanvas,
  clearAll,
  undoPath,
  getCanvas
} from '../api';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.changeColor = this.changeColor.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.undo = this.undo.bind(this);
    this.changeToEraser = this.changeToEraser.bind(this);
    this.clear = this.clear.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      color: 'black',
      drawWidth: 7,
      eraseWidth: 50,
      inDrawingMode: true
    };
  }

  componentDidMount() {
    const { current } = this.canvas;
    const paperName = this.props.navigation.getParam('paperName', 'andy');
    console.log(paperName);
    getCanvas(paperName, paths => {
      paths.forEach(path => current.addPath(path));
    });

    subscribeToCanvas(
      path => current.addPath(path),
      id => current.deletePath(id),
      () => current.clear()
    );
  }

  render() {
    const { color, inDrawingMode, drawWidth, eraseWidth } = this.state;
    return (
      <View style={styles.container}>
        <SketchCanvas
          style={{ flex: 15 }}
          strokeColor={color}
          strokeWidth={inDrawingMode ? drawWidth : eraseWidth}
          onStrokeEnd={addPathToCanvas}
          ref={this.canvas}
        />
        <Toolbar
          inDrawingMode={inDrawingMode}
          drawWidth={drawWidth}
          eraseWidth={eraseWidth}
          changeToEraser={this.changeToEraser}
          back={this.back}
          undo={this.undo}
          clear={this.clear}
          changeColor={this.changeColor}
          changeWidth={this.changeWidth}
        />
      </View>
    );
  }

  back() {
    this.props.navigation.navigate('FileManager');
  }

  clear() {
    this.canvas.current.clear();
    clearAll();
  }

  undo() {
    const id = this.canvas.current.undo();
    if (id != -1) {
      undoPath(id);
    }
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
    this.state.inDrawingMode
      ? this.setState({ drawWidth: newWidth })
      : this.setState({ eraseWidth: newWidth });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  }
});
