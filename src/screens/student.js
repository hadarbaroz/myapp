import React from "react";
import { StyleSheet } from "react-native";
import {withGlobalContext} from '../database/user';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GameScreen from "./GameScreen";
import StoreScreen from "./StoreScreen";
import StudentProfileScreen from "./StudentProfileScreen";

const Tab = createBottomTabNavigator();

const Student = (props) => {
    return (

      <Tab.Navigator style={styles.tabStyle}>
        <Tab.Screen name="Profile" component={StudentProfileScreen}/>
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="GameScreen" component={GameScreen} />
      </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabStyle: {
        // inactiveBackgroundColor: '#7459AE',
        // activeTintColor: '#B2ACF3'
        backgroundColor: 'black',
        fontSize: 18
    },
});

export default withGlobalContext(Student);

