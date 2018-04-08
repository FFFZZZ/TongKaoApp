import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';

import Util from '../helper/Util';
export default class Nodata extends Component {
    render() {
        return (
            <View style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>
                <Image style={[{
                    width: 222,
                    height: 237,
                    resizeMode: "center"
                }]}
                    source={require('./image/null.png')} />
            </View>
        )
    }
}