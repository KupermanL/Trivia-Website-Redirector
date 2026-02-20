import React from "react";
import "./App.css"; // Import your stylesheet

const Footer = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "20px",
        direction: "rtl",
      }}
    >
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "-20px",
        }}
      >
        עדיין לא הורדת את טריוויה ישראל?
      </p>
      <a
        href="https://play.google.com/store/apps/details?id=com.kupi.israel_trivia"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="./google-play-badge.png"
          alt="Google Play"
          style={{ width: "150px", verticalAlign: "middle" }}
        />
      </a>
    </footer>
  );
};

export default Footer;
