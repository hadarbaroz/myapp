import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {backgrounds, pets} from "../database/store";
import firebase from "../database/firebase";
import {withGlobalContext} from "../database/user";

const usersRef = firebase.firestore().collection('users');

const StoreScreen = ({global}) => {
  const [user, setUser] = useState(global.user);
  return (
    <ScrollView style={styles.back}>
      <ImageBackground source={backgrounds[user.background]} style={styles.background}>
        <Text style={styles.textHeader}>My Store</Text>
        <Text style={styles.textStyle}>Choose Your Favorite World</Text>
      {Object.keys(backgrounds).map(background => {
        if (background === user?.background) {
          return <Image style={styles.image} key={"image"+background} source={backgrounds[background]} />
        }

        return <TouchableOpacity key={"image-clickable"+background} onPress={()=> {
            usersRef
              .doc(`${user.uid}`)
              .update({background: background}).then(() => {
              user.background = background;
              global.setUser(user)
              setUser(user);
              alert('saved');
            });
        }}>
          <Image style={styles.image} source={backgrounds[background]} />
        </TouchableOpacity>
      })}
        <Text style={styles.textStyle}>Choose Your Favorite Pets</Text>
        {Object.keys(pets).map(pet => {
          if (pet === user?.pet) {
            return <Image style={styles.image} key={"image1"+pet} source={pets[pet].sprite.hello} />
          }

          return <TouchableOpacity key={"image1-clickable"+pet} onPress={()=> {
            usersRef
              .doc(`${user.uid}`)
              .update({pet: pet}).then(() => {
              user.pet = pet;
              global.setUser(user)
              setUser(user);
              alert('Pet Saved');
            });
          }}>
            <Image  style={styles.image} source={pets[pet].sprite.hello} />
          </TouchableOpacity>
        })}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width:150,
    height:150,
    resizeMode: 'center',
    borderRadius: 70,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  back: {
        flex:1
  },
  textStyle: {
    fontSize: 18,
    borderWidth: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#632A00',
    borderColor: '#632A00'
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#632A00',
  }

});
export default withGlobalContext(StoreScreen);