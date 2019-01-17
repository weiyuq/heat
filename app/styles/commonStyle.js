import {StyleSheet, Platform, Dimensions} from 'react-native';
import px2dp from '../components/px2dp';

let commonStyle = StyleSheet.create({

    container: {
        flexDirection: 'row',   // 水平排布
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        paddingTop: Platform.OS === 'ios' ? px2dp(20) : 0,  // 处理状态栏
        height: Platform.OS === 'ios' ? px2dp(68) : 48,   // 处理状态栏
        backgroundColor: '#0099FF',     //处理头部的颜色
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    leftIcon: {
        height: px2dp(26),
        width: px2dp(26),
    },
    rightIcon: {
        height: px2dp(26),
        width: px2dp(26),
    },
    titleBox: {
        height: px2dp(30),
        flexDirection: 'column',
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        alignItems: 'center',
        marginTop: px2dp(4),
        marginLeft: px2dp(20),
        marginRight: px2dp(20)
    },
    title: {
        fontSize: px2dp(20),
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: 'white'
    },
    searchBox: {
        height: px2dp(30),
        flexDirection: 'row',
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: px2dp(5),  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: px2dp(10),
        marginTop: px2dp(4),
        marginLeft: px2dp(20),
        marginRight: px2dp(20)
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: px2dp(14)
    },

    //错误消息提示框样式
    errorMsg: {
        position: "absolute",
        //opacity: 0.5,
        width: Dimensions.get('window').width,
        top: Platform.OS === 'ios' ? px2dp(68) + px2dp(30) : 48 + px2dp(30),   // 处理状态栏,
        left: 0,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#feefb8',
        flexDirection: 'row',
        alignItems: "center"
    },

    red_img: {
        width: px2dp(20),
        height: px2dp(20),
        resizeMode: 'stretch',
        marginRight: px2dp(8)
    },
});

export {commonStyle as default};
