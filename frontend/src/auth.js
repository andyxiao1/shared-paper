import { AsyncStorage } from 'react-native';

const USER_KEY = 'key-demo';

function onSignIn() {
  return AsyncStorage.setItem(USER_KEY, 'true');
}

function onSignOut() {
  return AsyncStorage.removeItem(USER_KEY);
}

function isSignedIn() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}

export { onSignIn, onSignOut, isSignedIn };
