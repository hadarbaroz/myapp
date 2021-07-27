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
import {backgrounds, pets} from "../database/store";
            import * as Progress from 'react-native-progress';
import {withGlobalContext} from "../database/user";

const StudentProfileScreen = ({global, navigation}) => {
    const totalProgress= ((+global?.user?.progress||0)+(+(global?.user?.progress2||0)) )/ 200
    return  <View style={styles.view}>
        <ImageBackground source={backgrounds[global?.user?.background]} style={styles.background}>
        <Text style={styles.textHeader}>{global?.user?.fullName} profile</Text>
            <Text style={styles.textStyle}>{'\n'}My Progress</Text>
            <Progress.Bar style={styles.progressBar} progress={totalProgress} />
            <Text style={styles.textStyle}>{"\n"}My Score:{'\n'}       {Math.round(totalProgress*100)}</Text>
            {global?.user?.pet ?
              <>
                  <Text style={styles.textStyle}>{'\n'}My Pet:</Text>
                  <Image style={styles.image} source={pets[global?.user?.pet]?.sprite.hello}/>
              </>
              :
              <Button
                onPress={() => {
                    navigation.navigate('Store');
                }}
                title="Choose pet"
              />
            }

            <View style={styles.view2}/>
        </ImageBackground>
    </View>;
};

const styles = StyleSheet.create({

    view:{flex:1, flexDirection: 'row', alignItems: 'flex-start'},
    view2:{flex:1},
    image: {
        width:200,
        height:100,
        resizeMode: 'center',
        alignSelf:'center'
    },
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
    progressBar: {
        height: 10,
        width: '77%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        alignSelf: 'center'
    }
});
export default withGlobalContext(StudentProfileScreen);