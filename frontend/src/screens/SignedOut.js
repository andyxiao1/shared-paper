import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

export default class SignedOut extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text h2 style={styles.textStyle}>
            Shared Paper
          </Text>
        </View>
        <View style={styles.elementsContainer}>
          <Button
            raised
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="Create an Account"
            backgroundColor="#517fa4"
          />
          <Button
            raised
            onPress={() => this.props.navigation.navigate('Login')}
            title="I Have an Account"
            backgroundColor="#517fa4"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192338',
    alignItems: 'center'
  },
  header: {
    flex: 0.8,
    justifyContent: 'center'
  },
  elementsContainer: {
    flex: 0.2,
    justifyContent: 'space-around',
    margin: 50
  },
  textStyle: {
    textAlign: 'center',
    color: 'white'
  }
});
