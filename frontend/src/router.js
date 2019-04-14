import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import Canvas from './screens/Canvas';
import FileManager from './screens/FileManager';
import SignedOut from './screens/SignedOut';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const AuthStack = createStackNavigator(
  {
    SignedOut: {
      screen: SignedOut,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#192338'
        }
      })
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#192338'
        }
      })
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: '#192338'
        }
      })
    }
  },
  {
    initialRouteName: 'SignedOut'
  }
);

const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Canvas,
      FileManager
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

export default RootNavigator;
