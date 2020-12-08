import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AutoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //signUp
  const handleSiginup = (email, password, usernaem) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(user.user.uid);
        return firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({ username: usernaem });
      })
      .then(() => {
        return firebase.auth().currentUser.updateProfile({
          displayName: usernaem,
        });
      })

      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            return err.message;
          // break;
          case "auth/week-password":
            return err.message;
          // break;
          default:
        }
      });
  };

  const handleSigngoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
        return user;
      })
      .then(async (user) => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set({ username: user.displayName });
        return user;
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };
  //login
  const hendaleLogin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            return err.message;
          // break;
          case "auth/wrong-password":
            return err.message;
          // break;
          default:
        }
      });
  };

  //logout
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const updateProfilename = (userName) => {
    return currentUser.updateProfile({
      displayName: userName,
    });
  };
  const updateProfilephoto = (photo) => {
    return currentUser.updateProfile({
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    handleSiginup,
    hendaleLogin,
    handleLogout,
    updateProfilename,
    updateProfilephoto,
    handleSigngoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
