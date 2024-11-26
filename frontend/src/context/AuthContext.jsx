// Import necessary functions from Firebase Authentication
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Import React utilities for context creation and state management
import { createContext, useContext, useEffect, useState } from "react";

// Import Firebase authentication configuration
import { auth } from "../firebase/firebase.config";

// Create a Context for authentication
const AuthContext = createContext();

// Initialize a GoogleAuthProvider instance for Google sign-in
const googleProvider = new GoogleAuthProvider();

// Custom hook to consume the AuthContext, making it easier to access the context values
export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication Provider Component to manage authentication state and provide it to children components
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to store the current authenticated user
  const [loading, setLoading] = useState(true); // State to track if the authentication process is still loading

  // Register a new user with email and password using Firebase Authentication
  const registerUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in a user with email and password using Firebase Authentication
  const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in a user with Google using Firebase Authentication's popup method
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // Monitor the user's authentication state (logged in or logged out)
  useEffect(() => {
    const signout = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update the current user state
      setLoading(false); // Mark loading as complete once the user state is determined

      // If a user is logged in, extract relevant user data
      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email, // User's email address
          username: displayName, // User's display name
          photo: photoURL // User's profile photo URL
        };
        // Note: The extracted userData is currently unused. Consider utilizing or storing it if necessary.
      }
    });

    // Clean up the listener on component unmount
    return () => signout();
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  // Log out the currently authenticated user
  const logout = async () => {
    return signOut(auth);
  };

  // Value object to be provided to context consumers, including current state and authentication methods
  const value = {
    currentUser, // The currently logged-in user, if any
    loading, // Boolean indicating if the authentication process is still loading
    registerUser, // Function to register a new user
    loginUser, // Function to log in a user
    signInWithGoogle, // Function to sign in with Google
    logout // Function to log out the current user
  };

  // Provide the context value to all child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
