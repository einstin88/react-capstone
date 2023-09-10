import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

// CONFIG & INIT
const firebaseConfig = {
  apiKey: 'AIzaSyAz02tRGScqhUQ9nuaQCy2i9H_IgSZ2thY',
  authDomain: 'udemy-react-capstone-db.firebaseapp.com',
  projectId: 'udemy-react-capstone-db',
  storageBucket: 'udemy-react-capstone-db.appspot.com',
  messagingSenderId: '913239400780',
  appId: '1:913239400780:web:d2ea4d746ccaff0bcb2fe9',
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// AUTH METHODS
export const auth = getAuth();

export const signInGooglePopUp = async () =>
  await signInWithPopup(auth, googleProvider);

export const signInEmail = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const createAuthUserWithEmail = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signUserOut = async () => await signOut(auth)

// FIRESTORE METHODS
export const db = getFirestore();

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error('Error creating user: ', error.message);
    }
  }

  return userDocRef;
};
