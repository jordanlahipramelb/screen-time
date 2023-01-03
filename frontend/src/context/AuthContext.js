import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

/** Firebase Authorization  */

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});
	// console.log(user);

	function signUp(email, password) {
		try {
			createUserWithEmailAndPassword(firebaseAuth, email, password);
		} catch (err) {
			console.log(err);
		}
	}

	function logIn(email, password) {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	}

	function logOut() {
		return signOut(firebaseAuth);
	}

	useEffect(() => {
		// When the component mounts; checks if a user is already logged in
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	});

	return (
		<AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function UserAuth() {
	return useContext(AuthContext);
}
