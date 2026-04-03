import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const navigate = useNavigate();

  // ✅ prevent crash
  if (!authUser) {
    return <div className="text-white p-10">Loading profile...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      const base64Image = reader.result;

      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio,
      });

      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg font-semibold">Profile details</h3>

          {/* Upload Image */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />

            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser.profilePic || assets.avatar_icon
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />

            <span>Upload profile image</span>
          </label>

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="p-2 rounded-md bg-transparent border border-gray-500 focus:outline-none"
            required
          />

          {/* Bio */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Write something about yourself..."
            className="p-2 rounded-md bg-transparent border border-gray-500 focus:outline-none"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-violet-600 py-2 rounded-md text-white cursor-pointer"
          >
            Save Profile
          </button>
        </form>

        {/* Right Side Image */}
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          src={authUser?.profilePic || assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;