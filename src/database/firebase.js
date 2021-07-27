import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBxTaIrA3NkENABx3t198F6Sp3FzzBhDTY",
  authDomain: "independo-eeebb.firebaseapp.com",
  projectId: "independo-eeebb",
  storageBucket: "independo-eeebb.appspot.com",
  messagingSenderId: "893716632604",
  appId: "1:893716632604:web:1de59b8626bec460b43bd9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;