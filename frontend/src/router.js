import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Canvas from './screens/Canvas';
import FileManager from './screens/FileManager';

const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Canvas,
      FileManager
    },
    {
      initialRouteName: 'FileManager'
    }
  )
);

export default RootNavigator;
