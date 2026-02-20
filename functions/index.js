const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addDeletionRequest = functions.https.onRequest(async (req, res) => {
  // Enable CORS using the `cors` module.
  const cors = require("cors")({ origin: true });
  cors(req, res, async () => {
    // Ensure the request is a POST method
    if (req.method !== "POST") {
      return res.status(400).send("Please send a POST request");
    }

    // Extract emailOrUsername from the request body
    const { emailOrUsername } = req.body;
    if (!emailOrUsername) {
      return res.status(400).send("Missing email or username");
    }

    try {
      // Insert into Firestore
      const writeResult = await admin
        .firestore()
        .collection("deletion-requests")
        .add({
          emailOrUsername: emailOrUsername,
          timestamp: admin.firestore.FieldValue.serverTimestamp(), // Timestamp for when the request was made
        });

      // Respond to the request indicating success
      res.status(200).send(`Deletion request added with ID: ${writeResult.id}`);
    } catch (error) {
      console.error("Error adding deletion request: ", error);
      res.status(500).send("Internal Server Error");
    }
  });
});
