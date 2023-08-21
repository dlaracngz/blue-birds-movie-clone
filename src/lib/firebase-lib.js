import { db } from "../firebase.config";
import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

export async function addFavoriteByUserDocId(userDocId, favoriteId) {
  const userRef = doc(db, "users", userDocId);
  try {
    await updateDoc(userRef, {
      favorites: arrayUnion(favoriteId),
    });
  } catch (err) {
    console.log("Favorilere Eklenemedi:", err);
  }
}

export async function getFavoritesByUserDocId(userDocId) {
  const docRef = doc(db, "users", userDocId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // eğer öyle bir döküman varsa şunları şunları yap.
    const user = docSnap.data();
    return user.favorites;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

export async function deleteFavoritesByUserDocId(userDocId, deleteId) {
  const userRef = doc(db, "users", userDocId);
  try {
    await updateDoc(userRef, { favorites: arrayRemove(deleteId) });
  } catch (err) {
    console.log("Favorilerden silinemedi", err);
  }
}
