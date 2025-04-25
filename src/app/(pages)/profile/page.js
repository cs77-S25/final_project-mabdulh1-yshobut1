"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db, storage } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "@/containers/public/Navbar";
import toast from "react-hot-toast";


const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [buttonState, setButtonState] = useState("idle"); // idle | saving | saved



  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const profile = { id: user.uid, ...snap.data() };
        setUserData(profile);
        localStorage.setItem("userProfile", JSON.stringify(profile));
      }
    };
  
    fetchProfile();
  }, []);
  


//   const handleFileChange = (e) => {
//     setNewAvatar(e.target.files[0]);
//   };

  const handleFileChange = (e) => {
	const file = e.target.files[0];
	if (file) {
	  setNewAvatar(file);
	  setPreview(URL.createObjectURL(file)); 
	}
  };
  

  const handleProfileUpdate = async () => {
    if (!userData) return;
  
    setButtonState("saving");
  
    let avatarURL = userData.avatar || "";
  
    try {
      if (newAvatar) {
        const fileRef = ref(storage, `avatars/${userData.id}`);
        await uploadBytes(fileRef, newAvatar);
        avatarURL = await getDownloadURL(fileRef);
      }
  
      const updatedProfile = {
        name: userData.name || "",
        bio: userData.bio || "",
        avatar: avatarURL,
      };
  
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, updatedProfile);
  
      const fullUserData = { id: userData.id, ...updatedProfile };
      setUserData(fullUserData);
      localStorage.setItem("userProfile", JSON.stringify(fullUserData));
  
      setButtonState("saved");
      toast.success("Profile updated!");
  
      setTimeout(() => {
        setButtonState("idle");
      }, 1500); // Reset after 1.5 seconds
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile");
      setButtonState("idle");
    }
  };
  
  
  


  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };  

  if (!userData) { //LETS MAKE THIS FUN!
	return (
	  <div className="min-h-screen flex flex-col items-center justify-center bg-maroon-50 text-maroon-900">
		<Image
		  src="/logo.png"
		  alt="SwatSwap logo"
		  width={100}
		  height={100}
		  className="animate-bounce mb-6"
		/>
		<h2 className="text-2xl font-semibold">Loading your profile...</h2>
		<p className="text-sm mt-2 text-gray-600">Please wait while we fetch your details from the cloud!</p>
		<div className="mt-6 w-16 h-16 border-4 border-maroon-900 border-t-transparent rounded-full animate-spin"></div>
	  </div>
	);
  }
  

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-maroon-50 to-white min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-10 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-maroon-100 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-maroon-200 opacity-20 rounded-full blur-3xl"></div>
  
          <div className="flex flex-col items-center space-y-6">
            {/* PROFILE PIC with glow and label */}
            <div className="relative group w-[140px] h-[140px]">
            <Image
              src={preview || userData.avatar || "/defaultProfile.svg"}
              alt="User Avatar"
              width={140}
              height={140}
              className="rounded-full object-cover w-[140px] h-[140px] border-4 border-maroon-900 shadow-md"
            />

              <label className="absolute bottom-0 right-0 bg-maroon-700 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-maroon-800 shadow">
                Change
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
  
            {/* Name field */}
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={onChange}
              className="text-3xl font-bold text-center text-maroon-900 bg-transparent focus:outline-none"
            />
  
            {/* Bio field */}
            <textarea
              name="bio"
              value={userData.bio}
              onChange={onChange}
              placeholder="Add a bio"
              className="mt-2 text-center p-3 w-full max-w-lg rounded-xl border border-gray-300 text-gray-700 focus:ring-2 focus:ring-maroon-300 focus:outline-none"
            />
  
            {/* Save button */}
            <button
              onClick={handleProfileUpdate}
              disabled={buttonState === "saving"}
              className={`mt-4 px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center gap-2 justify-center
                ${
                  buttonState === "saved"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-maroon-900 hover:bg-maroon-700 text-white"
                }`}
            >
              {buttonState === "saving" && (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </>
              )}
              {buttonState === "saved" && (
                <>
                  ✅ Saved!
                </>
              )}
              {buttonState === "idle" && "Save Changes"}
            </button>

          </div>
  
          {/* Navigation buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Link
              href="/swap-requests"
              className="text-center py-5 bg-maroon-900 hover:bg-maroon-700 text-white rounded-xl shadow-lg transition-transform hover:scale-[1.02] font-semibold"
            >
              View Swap Requests
            </Link>
            <Link
              href="/favorites"
              className="text-center py-5 bg-maroon-900 hover:bg-maroon-700 text-white rounded-xl shadow-lg transition-transform hover:scale-[1.02] font-semibold"
            >
              Favorited Listings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}  
export default ProfilePage;
