import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

export default function Invite() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const url = "http://localhost:3000"; // Replace with your actual URL

  const handleWhatsapp = () => {
    window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
  };

  const handleTelegram = () => {
    window.location.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check this out!")}`;
  };

  const handleInstagram = () => {
    window.location.href = "https://www.instagram.com"; // Instagram sharing through URL is not supported
  };

  const handleFacebook = () => {
    window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  };

  const handleLinkedin = () => {
    window.location.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent("Check this out!")}&summary=${encodeURIComponent("Check this out!")}&source=${encodeURIComponent(url)}`;
  };

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page in the history stack
  };

  return (
    <div className="p-6 m-6">
      <FaArrowLeft
        size={40}
        color="orange"
        onClick={handleBack}
        style={{ cursor: "pointer" }}
      />
      <p className="flex mt-10 text-3xl font-medium justify-center items-center pt-10 ml-5">
        Click the below link to share with your friends
      </p>
      <br />
      <button
        className="bg-orange-500 ml-[700px] text-3xl"
        onClick={() => setClicked(true)}
      >
        Share Link
      </button>
      {clicked ? (
        <div className="flex gap-4 justify-center items-center p-5 m-5 mt-5">
          <FaWhatsapp size={40} color="green" onClick={handleWhatsapp} style={{ cursor: "pointer" }}/>
          <FaTelegram size={40} color="grey" onClick={handleTelegram} style={{ cursor: "pointer" }}/>
          <FaInstagram size={40} color="red" onClick={handleInstagram} style={{ cursor: "pointer" }}/>
          <FaFacebook size={40} color="blue" onClick={handleFacebook} style={{ cursor: "pointer" }}/>
          <FaLinkedin size={40} color="blue" onClick={handleLinkedin} style={{ cursor: "pointer" }}/>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
