/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import React, { useRef } from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import moment from 'moment';
import 'moment/locale/ko';
import { RootStack } from './routes';
import store from './redux/store';
import { navigationRef } from './routes/navigation';
import { navigationTheme } from './styles';
moment.locale('ko');

const App = () => {
  const routeNameRef = useRef();
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <StatusBar barStyle="dark-content" />
        <SafeAreaProvider>
          <RootStack />
        </SafeAreaProvider>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
};

export const Empty = () => <View></View>;

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 30 * 60, // 30 minutes
};

export default codePush(codePushOptions)(App);
