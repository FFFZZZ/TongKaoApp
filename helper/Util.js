import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    color: {
        Main: '#409EFF',
        Success: '#67C23A',
        Warning: '#E6A23C',
        Danger: '#F56C6C',
        Info: '#909399'
    },
    font: {
        main: '#303133',
        common: '#606266',
        secondary: '#909399',
        placeholder: '#C0C4CC'
    },
    border: {
        one: '#DCDFE6',
        two: '#E4E7ED',
        three: '#EBEEF5',
        four: '#F2F6FC'
    }
};

export default Util;