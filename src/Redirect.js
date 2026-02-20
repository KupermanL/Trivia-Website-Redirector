import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import "./App.css"; // Import your stylesheet

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const userCode = searchParams.get("userCode");
  const gameCode = searchParams.get("gameCode");
  const deepLinkURL = userCode
    ? `triviaisrael://f/${userCode}`
    : gameCode
    ? `triviaisrael://g/${gameCode}`
    : "fallback-url"; // Replace 'fallback-url' as needed

  useEffect(() => {
    if (userCode || gameCode) {
      window.location.href = deepLinkURL;
    }
  }, [userCode, gameCode, deepLinkURL]);

  return (
    <div className="background">
      <div className="content">
        {userCode || gameCode ? (
          <div>
            <h1>הנך מועבר ל</h1>
            <img src="./logo.png" alt="App Logo" />
          </div>
        ) : (
          <div className="background">
            <div className="error-container">
              <img src="./square.png" alt="Error" />
              <div className="error-message">שגיאה</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Redirect;
