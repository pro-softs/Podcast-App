import React, { Component } from "react";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import Splash from './screens/splash';
import Login from './screens/login';
import Podcasts from './screens/podcasts';
import CommentScreen from './screens/comment';

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/reducers";
import {
	applyMiddleware,
	compose,
	createStore
} from "redux";

import {
  StyleSheet,
  View,
} from 'react-native';

const middleware = applyMiddleware(thunk);
let createStoreWithMiddleware = compose(
	middleware
);

const store = createStoreWithMiddleware(createStore)(
	rootReducer
);

const HomeNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Login: {screen: Login},
    Podcasts: {screen: Podcasts},
    CommentScreen: {screen: CommentScreen}
  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

const AppNavigator = SwitchNavigator(
  {
    Navigator: {screen: HomeNavigator}
  },
  {
    initialRouteName: "Navigator",
  }
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});