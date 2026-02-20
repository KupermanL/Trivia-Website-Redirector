import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Redirect from "./Redirect";
import AccountDeletionForm from "./AccountDeletionForm"; // Import the form component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/delete-account" element={<AccountDeletionForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
