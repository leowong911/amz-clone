import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDMd6PsLG5JgB9ie4KUpZ1U1n5euPiWdmE",
  authDomain: "clone-5ec49.firebaseapp.com",
  projectId: "clone-5ec49",
  storageBucket: "clone-5ec49.appspot.com",
  messagingSenderId: "934105287628",
  appId: "1:934105287628:web:5c99c4bf9c6764bd852b69",
  measurementId: "G-V266MB0L9L"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};