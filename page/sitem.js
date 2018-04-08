import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Util from '../helper/Util';
import { dateFtt } from '../helper/common'

export default class Item extends Component {
    render() {
        const Paper = this.props.Paper;

        const score = Paper.IsMarked == 2 ? null : <Text style={[{ lineHeight: 50 }]}>{Paper.GiveScore}分</Text>
        return (
            <TouchableHighlight onPress={() => this.props.Action(this.props.Index)} underlayColor="#fff" >
                <View style={styles.cell}>
                    <Text>{dateFtt("yyyy-MM-dd hh:mm:ss", Paper.DateCreated)}~{dateFtt("hh:mm:ss", Paper.SaveTime)}</Text>
                    {score}
                    <Text style={Paper.IsMarked == 2 ? styles.Warning : styles.Success}>{Paper.IsMarked == 1 ? '已批阅' : '未批阅'}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Util.size.width,
        padding: 15,
    },
    Success: {
        color: Util.color.Success
    },
    Warning: {
        color: Util.color.Danger
    }
})