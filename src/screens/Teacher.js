
import React, {useState, useEffect} from "react";
import {Text, StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
import {withGlobalContext} from '../database/user';
import {Feather} from '@expo/vector-icons';
import firebase from '../database/firebase';
import {UserType} from "../database/consts";

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
const Teacher = (props) => {
  const forceUpdate = useForceUpdate();
  const usersRef = firebase.firestore().collection('users');
  const [students, setStudents] = useState(props.global.user?.students || []);
  console.log(props.global);
  students.forEach(student => {
    try {
      console.log('test',props.global?.students[student])
      if (props.global?.students[student] === undefined) {
        props.global.setStudents({...props.global?.students, [student]: null});
        usersRef
          .doc(student)
          .get().then(val => {
          const idx = students.findIndex(uid => uid === student);
          if (!val.data()) {
            students.splice(idx, 1);
            setStudents(students);
            return;
          }
          console.log('got s', val.data(), students.findIndex(uid => uid === student))
          props.global.setStudents({...props.global?.students, [student]: {uid: student, ...val.data()}});
          forceUpdate();
        }, e => console.error(e));
      }
    } catch (E){}
  });
  const studentsToAdd = [];
  if (props.global.user?.students.forEach(uid => {
    if (students.findIndex(s => s === uid) < 0)
      studentsToAdd.push(uid);
  }))
    if (studentsToAdd.length)
      setStudents([...students, ...studentsToAdd])
  console.log('sss',props.global?.students)
  return (
    //<Text>Parent screen {JSON.stringify(props.global.user)}</Text>
    <ScrollView>
      <Text style = {styles.textHeader}>Hi {props.global?.user?.role === UserType.Parent ? 'Parent' : 'Teacher'}</Text>
      {students?.map(uid => {
        const student = (props.global?.students||{})[uid];
        return <TouchableOpacity onPress = {() => {
          if (!student) return;
          props.global.setCurrentStudent(student)
          props.navigation.navigate('StudentOverview')
        }} key={'l'+uid}>
          <Text style = {styles.textStyle}>{student?.fullName}</Text>
        </TouchableOpacity>
      })}
      <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
        <Feather name="plus" size={30}/>
      </TouchableOpacity>
    </ScrollView>
  );
};
// IndexScreen.navigationOptions = ({navigation}) => {
//   return {
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate('Create')}>
//         <Feather name="plus" size={30} />
//       </TouchableOpacity>
//     ),
//   };
// };


const styles = StyleSheet.create({
  icon: {
    fontSize: 20
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#BB32FF',

  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#BB32FF',
  }
});

export default withGlobalContext(Teacher);