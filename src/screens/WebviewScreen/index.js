import React from 'react';
import { Text } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { MainWrapper } from '../../styles/main';
import { WorldmapLoader } from '../../components/Loader';

const WebviewScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const { uri } = params;
  const dispatch = useDispatch();
  return (
    <WebView
      source={{ uri }}
      startInLoadingState
      renderLoading={() => <WorldmapLoader wrapperHeight={80}></WorldmapLoader>}
    ></WebView>
  );
};

export default WebviewScreen;
