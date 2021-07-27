import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';
import {NavigationActions as navigation} from "react-navigation";
import Game from "../components/Game";
import {withGlobalContext} from "../database/user";
import {backgrounds} from "../database/store";

const GameScreen = ({ navigation, global }) => {
  global.setNavigation(navigation);
  console.log('nav', global)
    return (
      <View style={styles.view}>
        <ImageBackground source={backgrounds[global?.user?.background]} style={styles.background}>
          <Text style={styles.textHeader}>welcome, {global?.user?.fullName}</Text>
          <Text style={styles.textStyle}>Choose your mission and start play!</Text>
          <Button
            onPress={() => {
                navigation.navigate('Game');
            }}
            title="I Brush My Teeth"
          />
        <Button
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('SecondGame');
          }}
          title="Setting the Table"
        />
        <Button
          onPress={() => {
            navigation.navigate('Game');
          }}
          title="Making My Bed"
        />
          <View style={styles.view2}/>
        </ImageBackground>
      </View>);
};

const styles = StyleSheet.create({
  view:{flex:1, flexDirection: 'row', alignItems: 'flex-start'},
  view2:{flex:1},
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#632A00',
    borderColor: '#632A00'
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#632A00',
    alignSelf: 'center'
  },
  buttonStyle:{
    borderRadius: 50,
    flex:3

  }
});
export default withGlobalContext(GameScreen);