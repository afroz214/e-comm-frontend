import firebase from 'firebase'

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAz3hakH-4iqywmv3zwKedtbWI9EYZXQuA",
    authDomain: "ecommerce-eceb6.firebaseapp.com",
    projectId: "ecommerce-eceb6",
    storageBucket: "ecommerce-eceb6.appspot.com",
    messagingSenderId: "48871679423",
    appId: "1:48871679423:web:748b77217719a60a566d0a",
    measurementId: "G-6DYNL9PM8G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  
  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()