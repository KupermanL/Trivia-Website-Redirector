import React, { useState } from "react";
import Footer from "./Footer";

const AccountDeletionForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace 'YOUR_FIREBASE_FUNCTION_URL' with your actual Firebase Function URL
    const endpoint =
      "https://us-central1-trivia-rn.cloudfunctions.net/addDeletionRequest";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrUsername }),
    });

    if (response.ok) {
      alert("Deletion request submitted successfully.");
      // Handle success response
    } else {
      alert("There was a problem with your request.");
      // Handle error response
    }
  };

  return (
    <div className="background">
      <div className="content">
        <div className="deletion-form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="emailOrUsername">
              Enter your Username or Email:
            </label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <button type="submit">Submit Deletion Request</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountDeletionForm;
