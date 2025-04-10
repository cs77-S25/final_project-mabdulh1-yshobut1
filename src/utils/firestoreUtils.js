// firestoreUtils.js

import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

// ========== USER FUNCTIONS ========== //

// Add a new user to Firestore
export const addUser = async ({ uid, name, email, bio = "" }) => {
  try {
    await setDoc(doc(db, "users", uid), {
      id: uid,
      name,
      email,
      bio,
      favorites: []
    });
    console.log("User added to Firestore");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Get a user by ID
export const getUserById = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// ========== LISTING FUNCTIONS ========== //

// Add a new listing
export const addListing = async (listing) => {
  try {
    const docRef = await addDoc(collection(db, "listings"), {
      ...listing,
      isVisible: true,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      time: new Date().toLocaleTimeString(),        // HH:MM:SS
      createdAt: serverTimestamp()
    });
    console.log("Listing added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding listing:", error);
    return null;
  }
};

// Get all listings
export const getAllListings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "listings"));
    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

// Get listings by user ID
export const getListingsByUserId = async (userId) => {
  try {
    const q = query(collection(db, "listings"), where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    const listings = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    return listings;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return [];
  }
};
