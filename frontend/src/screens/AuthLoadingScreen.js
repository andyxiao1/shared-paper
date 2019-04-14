import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { isSignedIn } from '../auth';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate();
  }

  authenticate() {
    isSignedIn()
      .then(res => this.props.navigation.navigate(res ? 'FileManager' : 'Auth'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192338',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
