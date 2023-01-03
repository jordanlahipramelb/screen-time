import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCiqsZssROvEOSlcMrltJRtSCZ9KTHiP0k",
	authDomain: "screen-time-2d055.firebaseapp.com",
	projectId: "screen-time-2d055",
	storageBucket: "screen-time-2d055.appspot.com",
	messagingSenderId: "767920916363",
	appId: "1:767920916363:web:557bfc9ca1951fb267918e",
	measurementId: "G-PXQ0SNEMS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

/** getAuth() ****

Returns the Auth instance associated with the provided FirebaseApp. If no instance exists, initializes an Auth instance with platform-specific default dependencies.
*/
