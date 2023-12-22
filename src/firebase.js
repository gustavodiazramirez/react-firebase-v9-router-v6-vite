
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUo6i0oORgvP6NEKWzIKdV3X3ARJJoOdg",
  authDomain: "udemy-react-2023-949fd.firebaseapp.com",
  projectId: "udemy-react-2023-949fd",
  storageBucket: "udemy-react-2023-949fd.appspot.com",
  messagingSenderId: "192316569423",
  appId: "1:192316569423:web:4928ab017dcfa7b2ccf73a"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

export {auth}