import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Text,
  Button
} from 'react-native-elements';
import { loginDB } from '../api';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      triedLogin: false,
      failedLogin: false
    };
  }

  validateSignUp() {
    const state = this.state;
    return state.username && state.password;
  }

  displayFormValidationMessage(input) {
    if (this.state.triedLogin && !input) {
      return (
        <FormValidationMessage>
          You must fill in this field!
        </FormValidationMessage>
      );
    }
  }

  displayFailedLoginAttempt() {
    if (this.state.failedLogin) {
      return <FormValidationMessage>Invalid Credentials</FormValidationMessage>;
    }
  }

  async loginCallBack() {
    const { username, password } = this.state;
    loginDB(username, password, isLoggedIn => {
      if (isLoggedIn) {
        // onSignIn().then(() => this.props.navigation.navigate('FileManager'));
        this.props.navigation.navigate('FileManager');
      } else {
        this.setState({ failedSignUp: true });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h3 style={styles.textStyle}>
          Login
        </Text>
        <FormLabel>Username</FormLabel>
        <FormInput
          onChangeText={text =>
            this.setState({ username: text, failedLogin: false })
          }
        />
        {this.displayFormValidationMessage(this.state.username)}
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          onChangeText={text =>
            this.setState({ password: text, failedLogin: false })
          }
        />
        {this.displayFormValidationMessage(this.state.password)}
        <Button
          raised
          onPress={() => this.loginCallBack().done()}
          title="Login"
          style={{ marginTop: 20 }}
          backgroundColor={this.validateSignUp() ? 'blue' : '#517fa4'}
        />
        {this.displayFailedLoginAttempt()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192338',
    justifyContent: 'center',
    padding: 50
  },
  textStyle: {
    textAlign: 'center',
    color: 'gray'
  }
});
