/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import reducers from '@redux/reducers';
import thunk from 'redux-thunk';

import RootRouter from './src/RootRouter';
import App from './App';
import {name as appName} from './app.json';

let store = null
if (__DEV__) {
	const composeEnhancers = 
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers)

	if (module.hot) {
		// Enable webpack hot module replacement for reducers
		module.hot.accept(reducers, () => {
			const nextRootReducers = reducers
			store.replaceReducers(nextRootReducers)
		})
	}

    // show network react-native-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData
} else {
	store = compose(applyMiddleware(thunk))(createStore)(reducers)
}

export default class DotPay extends Component {
	render() {
		const persistor = persistStore(store)
		
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<RootRouter />
				</PersistGate>
			</Provider>
		);
	}
}

AppRegistry.registerComponent(appName, () => DotPay);
