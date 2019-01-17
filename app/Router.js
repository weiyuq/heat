import React, {PureComponent} from "react";
import {Image} from "react-native";
import {createBottomTabNavigator, createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import home from './views/home';
import unitList from './views/unitList';
import UnitDetail from './views/unitDetail';
import UnitValue from './views/unitValue';
import alert from './views/alert';
import me from './views/me';
import Login from './views/login';
import meImg from './images/me.png'
import alertImg from './images/alert.png'
import homeImg from './images/home.png'
import unitImg from './images/unit.png'
/**
 * tabBar 图标生成方法
 */
let tabBarIcon = function (focused, tintColor, imgNormal, imgFocus) {
    let IconImg = focused ? imgFocus : imgNormal;
    return <Image source={IconImg} style={{tintColor: tintColor, width: 43, height: 40}}/>;
};

const MyTab = createBottomTabNavigator(
    {
        Home: {
            screen: home, navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, homeImg, homeImg)
            }
        },
        Units: {
            screen: unitList, navigationOptions: {
                tabBarLabel: '机组',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, unitImg, unitImg)
            }
        },
        Alert: {
            screen: alert, navigationOptions: {
                tabBarLabel: '告警',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, alertImg, alertImg)
            }
        },
        Me: {
            screen: me, navigationOptions: {
                tabBarLabel: '我',
                tabBarIcon: ({focused, tintColor}) => tabBarIcon(focused, tintColor, meImg, meImg)
            }
        },
    }, {
        initialRouteName: "Units",
        tabBarOptions: {
            activeTintColor: "#0099FF",
            inactiveTintColor: 'gray',
            style: {
                height: 62
            }
        },
        // tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);
const AppNavigator = createStackNavigator(
    {
        MyTab: {screen: MyTab},
        UnitDetail: {screen: UnitDetail},
        Login: {screen: Login},
        UnitValue: {screen: UnitValue}
    },
    {
        initialRouteName: "Login",
        headerMode: "none",
        // mode: 'modal'
    }
);

// const Router = createAppContainer(AppNavigator);

export default createAppContainer(AppNavigator);
// export class Router extends PureComponent {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <AppNavigator/>;
//     }
// }
// export default {ff: ff};
