// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from "../database/firebase";
import {UserType} from "../database/consts";
import {withGlobalContext} from "../database/user";
import Teacher from "../screens/Teacher";
import Parent from "../screens/Parent";
import Student from "../screens/student";

class Dashboard extends Component {
  state = {
    user: this.props.global.user
  };

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.global.setUser(null);
      this.props.navigation.navigate('Login');
    })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    if (!this.state.user)
      this.props.navigation.navigate('Login');

    switch (+this.state.user?.role) {
      case UserType.Parent:
        return (
          <Parent navigation={this.props.navigation} />
        )
      case UserType.Student:
        return (
          <Student navigation={this.props.navigation} />
        )
      case UserType.Teacher:
        return (
          <Teacher navigation={this.props.navigation} />
        )
      default:
        this.props.navigation.navigate('Login');
        return (<></>)
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});

export default withGlobalContext(Dashboard)