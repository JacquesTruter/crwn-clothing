// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: 'AIzaSyCu6rfEY3yPsTeULAAantpYgXTS4sSamqY',

	authDomain: 'new-crown-db-6c167.firebaseapp.com',

	projectId: 'new-crown-db-6c167',

	storageBucket: 'new-crown-db-6c167.firebasestorage.app',

	messagingSenderId: '89783462011',

	appId: '1:89783462011:web:8b7ff1cf3622d6b6ce1ade',
};

// Initialize Firebase

const firebassApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt });
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};
