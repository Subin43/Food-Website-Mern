import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCg0pTwcaqlPdZUjRQucEGeYBTeWUew84g',
  authDomain: 'food-app-authentication.firebaseapp.com',
  projectId: 'food-app-authentication',
  storageBucket: 'food-app-authentication.appspot.com',
  messagingSenderId: '496752014032',
  appId: '1:496752014032:web:185ad23f8a1f199bac64d5',
  measurementId: 'G-X3FSH0FK9D',
};

// Log the environment variable to verify it is being read correctly
// console.log('API Key:', firebaseConfig.apiKey);
// console.log('Auth Domain:', firebaseConfig.authDomain);
// console.log('Project ID:', firebaseConfig.projectId);
// console.log('Storage Bucket:', firebaseConfig.storageBucket);
// console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId);
// console.log('App ID:', firebaseConfig.appId);
// console.log('Measurement ID:', firebaseConfig.measurementId);
// const hi = 'Hello'; // Replace the process.env.REACT_APP_HI value directly
// console.log(hi); // Should output "Hello"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Log Firebase errors
auth.useDeviceLanguage(); // Optional: set device language for Firebase error messages
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User is signed in');
  } else {
    console.log('User is signed out');
  }
}, error => {
  console.error('Firebase Auth Error:', error.code, error.message);
});

export { app, auth };
