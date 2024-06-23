import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Log the environment variable to verify it is being read correctly
console.log('API Key:', firebaseConfig.apiKey);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('Project ID:', firebaseConfig.projectId);
console.log('Storage Bucket:', firebaseConfig.storageBucket);
console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId);
console.log('App ID:', firebaseConfig.appId);
console.log('Measurement ID:', firebaseConfig.measurementId);
const hi = process.env.REACT_APP_HI;
console.log(hi); // Should output "HelloFromEnv"

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
