// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: `${import.meta.env.VITE_API_KEY}`,
	authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
	projectId: `${import.meta.env.VITE_PROJECT_ID}`,
	storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
	messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
	appId: `${import.meta.env.VITE_APP_ID}`,
	measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}`
};

export function getFirebaseAuth() {
	const auth = getAuth(getFirebaseApp());
	auth.useDeviceLanguage(); // applies the default browser language or use auth.languageCode = "fr";

	return auth;
}

// firebaseApp
export function getFirebaseApp() {
	const firebaseAppConfig = getFirebaseConfig();
	let firebaseApp;
	if (getApps.length === 0) {
		firebaseApp = initializeApp(firebaseAppConfig);
		console.log("App initialized", firebaseApp);
	} else {
		firebaseApp = getApp();
		console.log("App recalled", firebaseApp);
	}
	return firebaseApp;
}

function getFirebaseConfig() {
	if (!firebaseConfig || !firebaseConfig.apiKey) {
		throw new Error(
			'No Firebase configuration object provided.' +
				'\n' +
				"Add your web app's configuration object to firebase-config.js"
		);
	} else {
		return firebaseConfig;
	}
}
