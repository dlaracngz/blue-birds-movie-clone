import { useEffect, useState, createContext, useContext } from "react";

import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "../firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  addFavoriteByUserDocId,
  deleteFavoritesByUserDocId,
  getFavoritesByUserDocId,
} from "../lib/firebase-lib";

const userContext = createContext();

export const useAuth = () => {
  return useContext(userContext);
};

function UserAuthContext({ children }) {
  const [error, setError] = useState("");
  const [currentUser, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userId", "==", user.uid));
        const querySnapsShot = await getDocs(q);
        const userDoc = querySnapsShot.docs[0];
        const userDocId = userDoc.id;
        const favorites = await getFavoritesByUserDocId(userDocId);
        setUser({
          ...user,
          userDocId,
          favorites,
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  const UserLogin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const addFavorites = async (userDocId, favoriteId) => {
    try {
      await addFavoriteByUserDocId(userDocId, favoriteId); // firebase'e ekliyor.
      setUser((prevState) => ({
        ...prevState,
        favorites: [...prevState.favorites, favoriteId],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const removeFavorite = async (userDocId, deleteId) => {
    try {
      await deleteFavoritesByUserDocId(userDocId, deleteId); // firebase'den siliyor
      setUser((prevState) => ({
        ...prevState,
        favorites: prevState.favorites.filter((f) => f !== deleteId),
      })); // oturum açmış kullanıcıdan siliyor
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = async (email, password, FullName) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password) // Bu fonksiyon ilk parametre olarak auth ı alır.
      .then(async (result) => {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            FullName,
            userId: `${result.user.uid}`,
            favorites: [],
          });
          alert("Welcome new User create succesfully");
          // console.log("Document written with ID:", docRef.id);
        } catch (e) {
          console.error("Error adding document", e);
        }
      })
      .catch((err) => {
        // Hata çıkarsa
        if (err.code === "auth/email-alreday-in-use") {
          setInterval(() => {
            setError("");
          }, 10000);
          setError("email already in use try another email");
        } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setInterval(() => {
            setError("");
          }, 10000);
          setError("Password must be 6 character");
        } else {
          setError(err.message);
        }
      });
  };

  const value = {
    signUp,
    error,
    currentUser,
    isLoggedIn,
    UserLogin,
    logout,
    addFavorites,
    removeFavorite,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export default UserAuthContext;
