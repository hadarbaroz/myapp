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


const StudentOverview = ({global, navigation}) => {
    const totalProgress= ((+global?.currentStudent?.progress||0)+(+(global?.currentStudent?.progress2||0)) )/ 200
    return  <View style={styles.view}>
        <ImageBackground source={backgrounds[global?.currentStudent?.background]} style={styles.background}>
        <Text style={styles.textHeader}> Hey There, {global?.user?.fullName}!{"\n"} {global?.currentStudent?.fullName} - Profile </Text>
            <Progress.Bar progress={totalProgress} width={200} />
            <Text style={styles.textStyle}>Score:{Math.round(totalProgress*100)}</Text>
            {global?.currentStudent?.pet ?
              <>
                  <Text style={styles.textStyle}>My Pet:</Text>
                  <Image style={styles.image} source={pets[global?.currentStudent?.pet]?.sprite.hello}/>
              </>
              :undefined
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
        height:200,
        resizeMode: 'center'
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
    },
    textHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#632A00',
    }
});
export default withGlobalContext(StudentOverview);