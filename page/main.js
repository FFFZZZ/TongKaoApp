/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Util from '../helper/Util';

import PapersScreen from "./papers"
import UserScreen from './user'


const Tab = TabNavigator(
    {
        Papers: { screen: PapersScreen },
        User: { screen: UserScreen },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Papers') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'User') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                }
                return <Ionicons name={iconName} size={30} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: Util.color.Main,
            inactiveTintColor: Util.color.Info,
            showLabel: false
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true
    }
);

export default class Main extends Component {
    static navigationOptions = {
        headerTitle: '统考练考系统',
        headerTitleStyle: {
            color: '#fff',
            alignSelf: 'center'
        },
        headerStyle: {
            backgroundColor: Util.color.Main,
        },
        headerLeft: null,
    };
    _paper = (paper) => {
        this.props.navigation.navigate('PaperScreen', paper)
    }
    _login = () => {
        this.props.navigation.navigate('LoginScreen')
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Util.color.Main}
                    translucent={false}
                />
                <Tab
                    screenProps={{ paper: this._paper, loginOut: this._login }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
