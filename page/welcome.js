import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

import Util from '../helper/Util'

export default class Welcome extends Component {
    static navigationOptions = {
        headerMode: 'none',
        header: null
    };
    componentDidMount() {
        storage.load({ key: 'user' }).then(res => {
            global.user.loginState = true;
            global.user.userData = res;
            setTimeout(() => {
                this.props.navigation.navigate('MainScreen')
            }, 2000)
        }).catch((err) => {
            global.user.loginState = false;
            global.user.userData = "";
            setTimeout(() => {
                this.props.navigation.navigate('LoginScreen')
            }, 2000)
        })
    }
    render() {
        return (
            <View>
                <StatusBar
                    hidden={true}
                    translucent={false}
                />
                <Image
                    style={styles.icon}
                    source={require('./image/welcome.png')}
                    resizeMode="cover"
                />
            </View>
        )

    }
}
const styles = StyleSheet.create({
    icon: {
        height: Util.size.height,
        width: Util.size.width
    }
})