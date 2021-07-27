// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../database/firebase';
import logo from '../assets/images/independo.png'
import {withGlobalContext} from "../database/user";

class Login extends Component {

  state = {
    email: '',
    password: '',
    isLoading: false
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      const usersRef = firebase.firestore().collection('users');
      firebase
        .auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredential => {
          usersRef
            .doc(`${userCredential.user.uid}`)
            .get().then(val => {
            console.log('data', val.data());
            this.props.global.setUser({email: userCredential.user.email, uid: userCredential.user.uid, ...val.data()})
            this.props.navigation.navigate('Dashboard');
          }).catch(err => {
            console.log(err)
          })
            .catch(error => console.log('error', error));
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <>
        <View style={styles.container}>
          <Image style={styles.image} source={logo} />
        </View>
        <View style={ styles.containerBorder}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
          />
          <Button
            color="#9783B5"
            title="Signin"
            onPress={() => this.userLogin()}
          />

          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Click here to Signup
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // marginBottom: 50
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#BB32FF',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
    resizeMode: 'contain'
  },
  containerBorder: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    margin: 10
  },
  back: {
    backgroundColor: '#BB32FF'
  }
});
export default withGlobalContext(Login)