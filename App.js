/** @format */

import React, {Component} from 'react';
import { Image } from 'react-native';
//import { AppLoading, Asset, Font } from 'expo';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { persistGate } from 'redux-persist/es/integration/react';
import reducers from '@redux/reducers';
import thunk from 'redux-thunk';
import { Images, Constants } from '@common';
import RootRouter from './src/RootRouter';
import SplashScreen from 'react-native-splash-screen'

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      appIsReady: false,
    };
  }

  componentWillMount() {
    SplashScreen.show();
  }

  async loadAssets() {
    const imageAssets = cacheImages([Images.logo]);

    const fontAssets = cacheFonts([

    ]);

    await Promise.all([...fontAssets, ...imageAssets]);
  }

  render() {
    let store = null;

    if (__DEV__) {
      const composeEnhancers = 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);

      if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(reducers, () => {
          const nextRootReducer = reducers;
          store.replaceReducer(nextRootReducer);
        })
      }
    } else {
      store = compose(applyMiddleware(thunk))(createStore)(reducers);
    }

    const persistor = persistStore(store);

    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={console.warn('error')}
        />
      );

      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter />
          </PersistGate>
        </Provider>
      );
    }
  }
}