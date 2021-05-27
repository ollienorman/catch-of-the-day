import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCSBjtxzf3u65Y8kBeZAzsGPHMEQdPZcAs',
  authDomain: 'catch-of-the-day-ollie-n-bcc14.firebaseapp.com',
  databaseURL:
    'https://catch-of-the-day-ollie-n-bcc14-default-rtdb.firebaseio.com',
  projectId: 'catch-of-the-day-ollie-n-bcc14',
  storageBucket: 'catch-of-the-day-ollie-n-bcc14.appspot.com',
  messagingSenderId: '95238424483',
  appId: '1:95238424483:web:c535cb4b7602d946507c16',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp, base };
