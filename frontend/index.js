import { AppRegistry } from 'react-native';
import Canvas from './src/Canvas';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Canvas);

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
