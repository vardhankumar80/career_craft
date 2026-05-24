import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextBox from "../TextBox";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function EditProfile() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async (email) => {
      try {
        if (!email) alert("Email is required");

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getuserbyemail`, {
          params: { email },
        });

        setId(response.data.user._id);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
        setConfirmPassword(response.data.user.password);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    };

    fetchUserData(localStorage.getItem("email"));
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/update/${id}`, { name, email, password });
      alert(response?.data?.message);
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-16">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Your Profile</h2>
        <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
          <TextBox label="Name" type="text" Icon={UserIcon} value={name} setValue={setName} required />

          <TextBox label="Email" type="text" Icon={EnvelopeIcon} value={email} setValue={setEmail} required />

          <TextBox label="Password" type="password" Icon={LockClosedIcon} value={password} setValue={setPassword} required />

          <TextBox
            label="Confirm Password"
            type="password"
            Icon={LockClosedIcon}
            value={confirmPassword}
            setValue={setConfirmPassword}
            required
          />

          <Button
            type="submit"
            name="Update Profile"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all"
          />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
