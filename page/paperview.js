import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import Util from '../helper/Util';
import Api from '../helper/Api';

import Icon from 'react-native-vector-icons/FontAwesome'


export default class PaperView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params.Name,
            headerTitleStyle: {
                color: '#fff',
                alignSelf: 'center'
            },
            headerStyle: {
                backgroundColor: Util.color.Main,
            },
            headerRight: <View></View>,
            headerLeft: <View style={[{ marginLeft: 10 }]}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}
                    style={[{ width: 40 }]}>
                    <Icon name="angle-left" size={40} color="#fff" />
                </TouchableOpacity  >
            </View>
        }
    }
    render() {
        const { params } = this.props.navigation.state
        const url = `${Api.doWork}?StuId=${global.user.userData.Id}&PaperId=${params.Id}`
        return (
            <View style={[{ flex: 1 }]}>
                <WebView
                    source={{ uri: url }}
                    onMessage={e => {
                        let data = e.nativeEvent.data;
                        this.props.navigation.navigate('PaperScreen', params)
                    }}
                    javaScriptEnabled={true}
                />
            </View>
        )
    }
}