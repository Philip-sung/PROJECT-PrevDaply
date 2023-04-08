/**
 * @format
 */
import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { ThemeManager, Colors } from 'react-native-ui-lib';
import OneSignal from 'react-native-onesignal';

import App from './src/app';
import { name as appName } from './app.json';

import { colorTheme } from './src/styles';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

// OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('de43dbd9-6946-4a2c-bf5b-2b6581e7455a');
// END OneSignal Init Code

Colors.loadColors({
  error: '#ff2442',
  success: '#00CD8B',
  text: '#20303C',
  point: colorTheme.primary[300],
  secondary: colorTheme.secondary[300],
});

Colors.loadSchemes({
  light: {
    screenBG: Colors.white,
    textColor: colorTheme.text,
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
  },
});

ThemeManager.setComponentTheme('Text', {
  text70: true, // will set the text70 typography modifier prop to be true by default
  dark10: true, // will set the dark10 color modifier prop to be true by default
  fontFamily: 'NotoSansKR-Regular',
});

ThemeManager.setComponentTheme('Button', (props, context) => ({
  // this will apply a different backgroundColor
  // depends if the Button is an outline or not
  backgroundColor: props.outline ? 'black' : colorTheme.primary[300],
  fontFamily: 'NotoSansKR-Regular',
  outlineColor: props.outline ? colorTheme.primary[300] : 'transparent',
  linkColor: colorTheme.secondary[300],
}));

ThemeManager.setComponentTheme('TextField', (props, context) => ({
  autoCapitalize: 'none',
  underlineColor: colorTheme.primary[300],
}));

ThemeManager.setComponentTheme('TabBar', (props, context) => ({
  indicatorStyle: {
    backgroundColor: colorTheme.primary[300],
  },
}));

ThemeManager.setComponentTheme('TabBar.Item', (props, context) => ({
  selectedLabelStyle: {
    color: colorTheme.primary[300],
  },
  labelStyle: {
    color: Colors.grey20,
  },
  style: {
    color: colorTheme.primary[300],
  },
}));

AppRegistry.registerComponent(appName, () => App);
