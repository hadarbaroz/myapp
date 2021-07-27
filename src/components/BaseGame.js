import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {withGlobalContext} from "../database/user";
import firebase from "../database/firebase";
import YoutubePlayer from 'react-native-youtube-iframe';
import {Touchable} from "react-native-web";

const usersRef = firebase.firestore().collection('users');
const BaseGame = ({global, gameDefinition, progressKey, navigation}) => {
  const [user, setUser] = useState(global.user);
  const [loading, setLoading] = useState(typeof user[progressKey] !== "number" || user[progressKey] === 100);
  const [currentGame, setCurrentGame] = useState([...gameDefinition.images].sort(function(){
    return .5 - Math.random();
  }));
  if (loading) {
    usersRef
      .doc(`${user.uid}`)
      .update({[progressKey]: 0}).then(() => {
      user[progressKey] = 0;
      global.setUser(user)
      setLoading(false);
    });
    return <Text>Loading</Text>;
  }
  return <ScrollView >
    <Text style={styles.textHeader}>Mission Video</Text>
    <YoutubePlayer
      height={300}
      play={true}
      videoId={gameDefinition.video}
    />
    <View style={styles.images}>
    {currentGame.map(step => {
      if (step.progress === user[progressKey]) {
        return <Image key={"image"+step.progress} source={step.image} />
      }

      return <TouchableOpacity key={"image-clickable"+step.progress} onPress={()=> {
        if (step.progress - gameDefinition.progressStep === global.user[progressKey]) {
          usersRef
            .doc(`${user.uid}`)
            .update({[progressKey]: step.progress}).then(() => {
            user[progressKey] = step.progress;
            global.setUser(user)
            setUser(user);
            Alert.alert('Great, You are Right');
           if (user[progressKey] === 100){
             Alert.alert('Awesome! Great Job');
             global.navigation.navigate('Profile');
           }
          });
        } else {
          Alert.alert('Try again');
          // alert(`${step.progress} - ${gameDefinition.progressStep} === ${global.user[progressKey]}`);
        }
      }}>
        <Image style={styles.image} source={step.image} />
      </TouchableOpacity>
    })}
    </View>
  </ScrollView >;
}

const styles = StyleSheet.create({
  images: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  image: {
    padding: 10
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#055FA4',
  }
});
export default withGlobalContext(BaseGame);