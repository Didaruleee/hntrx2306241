// import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDmqEpBSu_APMnGpLvG43nrbWHKFXgR7FE',
    authDomain: 'proton-market.firebaseapp.com',
    projectId: 'proton-market',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const db = firebase.firestore();
