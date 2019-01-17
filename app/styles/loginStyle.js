/**
 * Created by ZhouTing on 2016/12/3.
 */
import {StyleSheet,Platform,PixelRatio} from 'react-native';

import px2dp from '../components/px2dp';

let loginStyle = StyleSheet.create({

    loginItem: {
        marginLeft: px2dp(40),
        marginRight: px2dp(40),
        marginTop: px2dp(50),   //出现sign in with部分代码之后,将值改为30
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#b3b3b3',
        borderRadius: px2dp(4)
    },
    loginItemEmail: {
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#b3b3b3',
        flexDirection: 'row'
    },
    loginItemLogo: {
        marginLeft: px2dp(16),
        paddingRight: px2dp(16),
        borderRightWidth: 1 / PixelRatio.get(),
        borderColor: '#b3b3b3'
    },
    loginItemLogo_Img: {
        width: px2dp(30),
        height: px2dp(30),
        resizeMode: 'stretch'
    },
    loginItemPassword: {
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        flexDirection: 'row'
    },
    TextInput: {
        padding: 0,
        width: px2dp(230),
        height: px2dp(26),
        paddingLeft: 16
    },
    instructions: {
        textAlign: 'center',
        color: '#e4393c',
        marginBottom: px2dp(10),
        marginTop: px2dp(10)
    },
    button: {
        marginLeft: px2dp(40),
        marginRight: px2dp(40),
        marginBottom: px2dp(20),
        marginTop: px2dp(20),
        backgroundColor: '#0099FF',
        alignItems: 'center',
        justifyContent: 'center',
        height: px2dp(50),
        borderRadius: 2
    },
    ButtonText: {
        color: '#fff',
        fontSize: px2dp(16),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        marginTop: px2dp(4),
        color: '#e4393c',
        textAlign: 'center'
    },
    logoItem: {
        alignItems: 'center',
        marginTop: px2dp(40),
    },
    logoImage: {
        width: px2dp(120),
        height: px2dp(120),
        resizeMode: 'stretch'
    },
    logoText: {
        marginTop: px2dp(10),
        textAlign: 'center',
        color: '#0099FF',
        fontSize: 30,
    },
});

export {loginStyle as default};
