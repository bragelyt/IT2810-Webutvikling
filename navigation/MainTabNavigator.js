import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SingleItemScreen from '../screens/SingleItemScreen';
import UserScreen from "../screens/UserScreen";

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

/** Navstack for home **/
const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        SingleItem: SingleItemScreen,
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused}
                    name={ Platform.OS === 'ios' ? `ios-home` : 'md-home' } />
    ),
};

/** Navstack for user **/
const UserScreenStack = createStackNavigator(
    {
        User: UserScreen,
    },
    config
);

UserScreenStack.navigationOptions = {
    tabBarLabel: 'User',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
    ),
};

/** Navbar with stacks **/
const tabNavigator = createBottomTabNavigator({
    HomeStack,
    UserScreenStack
});

tabNavigator.path = '';

export default tabNavigator;