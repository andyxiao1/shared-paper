import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Text
} from 'react-native-elements';
import { signUpDB } from '../api';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      triedRegister: false,
      failedSignUp: false
    };
  }

  validateSignUp() {
    const state = this.state;
    return state.username && state.password && state.password.length >= 8;
  }

  displayFormValidationMessage(input, isPassword = false, isPhone = false) {
    if (this.state.triedRegister) {
      if (!input) {
        return (
          <FormValidationMessage>
            You must fill in this field!
          </FormValidationMessage>
        );
      } else if (isPassword && input.length < 8) {
        return (
          <FormValidationMessage>
            Password must be at least 8 characters
          </FormValidationMessage>
        );
      }
    }
  }

  displayFailedSignUpAttempt() {
    if (this.state.failedSignUp) {
      return <FormValidationMessage>Invalid Credentials</FormValidationMessage>;
    }
  }

  async signUpCallBack() {
    const { username, password } = this.state;
    signUpDB(username, password, isSignedUp => {
      if (isSignedUp) {
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
          Create an Account!
        </Text>
        <FormLabel>Username</FormLabel>
        <FormInput
          onChangeText={text =>
            this.setState({ username: text, failedSignUp: false })
          }
        />
        {this.displayFormValidationMessage(this.state.username)}
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          onChangeText={text =>
            this.setState({ password: text, failedSignUp: false })
          }
        />
        {this.displayFormValidationMessage(this.state.password, true)}
        <Button
          raised
          onPress={() => this.signUpCallBack().done()}
          title="Sign Up"
          style={{ marginTop: 20 }}
          backgroundColor={this.validateSignUp() ? 'blue' : '#517fa4'}
        />
        {this.displayFailedSignUpAttempt()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#192338',
    padding: 50
  },
  textStyle: {
    textAlign: 'center',
    color: 'gray'
  }
});
