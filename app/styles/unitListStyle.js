import {StyleSheet, Platform, Dimensions, PixelRatio} from 'react-native';
import px2dp from '../components/px2dp';

let unitListStyle = StyleSheet.create({

    unitItem: {
        flex: 5,
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
        // height: px2dp(20),
        justifyContent: 'space-between',
    },
    unitImage: {
        width: px2dp(15),
        height: px2dp(15),
    }
});

export {unitListStyle as default};
