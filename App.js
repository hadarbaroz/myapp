// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./src/components/Signup";
import Dashboard from "./src/components/Dashboard";
import Login from "./src/components/Login";
import {UserContextProvider} from "./src/database/user";
import Game from "./src/components/Game";
import SecondGame from "./src/components/SecondGame";
import StudentOverview from "./src/screens/StudentOverview";

const Stack = createStackNavigator();


function MyStack() {
  return (
    <UserContextProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#8768B9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Signup' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={
            {
              title: 'Login',
              headerLeft: null
            }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={
            { title: 'Dashboard', headerLeft: null }
          }
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={
            { title: 'Game', headerLeft: null }
          }
        />
        <Stack.Screen
          name="SecondGame"
          component={SecondGame}
          options={
            { title: 'SecondGame', headerLeft: null }
          }
        />
        <Stack.Screen
          name="StudentOverview"
          component={StudentOverview}
          options={
            { title: 'StudentOverview', headerLeft: null }
          }
        />
      </Stack.Navigator>
    </UserContextProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};