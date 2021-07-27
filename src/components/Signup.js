// components/signup.js

import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, Picker, ActivityIndicator} from 'react-native';
import firebase from '../database/firebase';
import {withGlobalContext} from "../database/user";
import {UserType} from "../database/consts";
import student from "../screens/student";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      role: props?.global?.user ? UserType.Student: UserType.Parent,
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    // Alert.alert(JSON.stringify({val, prop, state: state[prop]}))
    this.setState(state);
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '' && this.state.role === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      const usersRef = firebase.firestore().collection('users');
      const auth = firebase.auth();
      const cb = (userCredential) => {
        const userInfo = {
          fullName: this.state.fullname,
          role: this.state.role,
          level: 0
        };
        console.log(this.props);
        if (this.state.role === UserType.Teacher) {
          userInfo.students = [];
        } else if (this.state.role === UserType.Student) {
          userInfo.progress = 0;
        }
        if (this.props.global.user) {
          userInfo.parent = this.props.global.user.uid;

          const students = [...(this.props.global.user.students||[]), userCredential.user.uid];
          usersRef
            .doc(`${this.props.global.user.uid}`)
            .update({students}).then(() => {
            this.props.global.user.students = students;
            this.props.global.setUser(this.props.global.user)
            this.props.navigation.navigate('Dashboard');
          });
        } else {
          this.props.global.setUser({
            ...userInfo,
            email: this.state.email,
            uid: userCredential.user.uid
          })
        }
        console.log(this.props);
        usersRef
          .doc(`${userCredential.user.uid}`)
          .set(userInfo).then(() => {
          //console.log(1111);

          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
            role: ''
          });
          Alert.alert('User has been created');
          if (!this.props.global.user)
            this.props.navigation.navigate('Dashboard');
        }).catch(err => {
          console.log(err)
        })
      };
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          if(this.props.global.user){
            cb(userCredential);
            return;
          }
          auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => cb(userCredential));

        }).catch(error => {
          this.setState({ isLoading: false });
          Alert.alert('Something went wrong. Please try again');
          console.log(error.message);

        })
    }
  }

  render() {
     if (+this.props.global?.user?.role === UserType.Student) {
      this.props.navigation.navigate("Dashboard")
       return <></>;
     }
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.fullname}
          onChangeText={(val) => this.updateInputVal(val, 'fullname')}
        />
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
        {this.props.global.user ? undefined :
          <Picker
            style={styles.inputStyle}
            placeholder="Role"
            selectedValue={this.state.role}
            onValueChange={(val) => this.updateInputVal(val, 'role')}>
            {Object.keys(UserType).map(value => <Picker.Item key={"role" + value} label={value}
                                                             value={UserType[value] + ''}/>)}
          </Picker>

        }
        <Button
          color='#BB32FF'
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Click here to Login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    borderTopWidth: 1,
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
  }
});

export default withGlobalContext(Signup);