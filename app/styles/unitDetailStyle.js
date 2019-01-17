import {StyleSheet, Platform, Dimensions, PixelRatio} from 'react-native';
import px2dp from '../components/px2dp';

let unitListStyle = StyleSheet.create({

    unitItem: {
        // flex: 2,
        flexDirection: 'row',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#b3b3b3',
        borderRadius: px2dp(4),
        // marginLeft: px2dp(10),
        // marginRight: px2dp(10),
        // marginTop: px2dp(5),
        // marginBottom: px2dp(5),
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        fontSize:16,
        // height: px2dp(50),
        justifyContent: 'space-between',
    },
    rightImage:{
        // flex: 1,
        height: px2dp(25),
        width: px2dp(25),
    },
    valueItem: {
        // display: flex,
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        marginTop: px2dp(15),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#b3b3b3',
    },
    valueText: {
        flex: 1,
    },
    editText:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    TextInput: {
        // flex:1,
        borderBottomWidth: 1 / PixelRatio.get(),
        // borderWidth: 1 / PixelRatio.get(),
        borderColor: '#0099FF',
        padding: 0,
        height: px2dp(30),
        width: px2dp(50),
        // width: 'auto',
    },
    editImg: {
        // flex:1,
        height: px2dp(20),
        width: px2dp(20),
    },
});

export {unitListStyle as default};
