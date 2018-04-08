import React, { Component } from 'react';
import { AppRegistry, ToastAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
//全局变量
import './helper/StorageUtil'

import './helper/Global'



import Login from './page/login'
import Welcome from './page/welcome'
import Main from './page/main';

import Paper from './page/detail';
import DoWork from './page/paperview';
import History from './page/history'

const App = StackNavigator({
    WelcomeScreen: {
        screen: Welcome
    },
    LoginScreen: {
        screen: Login
    },
    MainScreen: {
        screen: Main
    },
    PaperScreen: {
        screen: Paper
    },
    DoWorkScreen: {
        screen: DoWork
    },
    HistoryScreen: {
        screen: History
    }
}, {
        initialRouteName: 'WelcomeScreen',
        headerMode: 'screen'
    })

const defaultGetStateForAction = App.router.getStateForAction;

App.router.getStateForAction = (action, lastState) => {
    if (action.routeName && action.routeName != 'LoginScreen' && !global.user.loginState) {
        const routes = [
            ...lastState.routes,
            { key: 'id-' + Date.now(), routeName: 'LoginScreen' },
        ];
        return {
            ...lastState,
            routes,
            index: routes.length - 1,
        };
    }
    if (action.routeName) {
        if (action.routeName == 'MainScreen') {
            const routes = [{ key: 'id-' + Date.now(), routeName: 'MainScreen' }];
            return {
                routes,
                index: 0
            }
        }
    }
    return defaultGetStateForAction(action, lastState);
}

AppRegistry.registerComponent('TongKaoApp', () => App);
