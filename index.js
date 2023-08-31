/**
 * @format
 */
import React from 'react';
import {Text, TextInput, AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

function Main() {
  return <App />;
}

AppRegistry.registerComponent(appName, () => Main);

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  Text.defaultProps.style = {color: 'black'};
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.style = {color: 'black'};
}
