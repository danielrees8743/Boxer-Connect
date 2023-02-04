import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import config from './config';

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.authDomain,
  storageBucket: config.firebase.projectId,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
