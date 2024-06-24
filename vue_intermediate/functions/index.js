/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/index.js
const admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore");
const {schedule} = require("firebase-functions/v1/pubsub");
const {initializeApp} = require( "firebase-admin/app");

initializeApp();
const firestore = getFirestore();
if (process.env.FUNCTIONS_EMULATOR) {
  firestore.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

// eslint-disable-next-line max-len
exports.sendPendingTasksNotifications = schedule("every 24 hours").onRun(async (context) => {
  const today = new Date();
  today.setDate(today.getDate() - 3);
  const threeDaysAgo = today.toISOString().split("T")[0];

  const querySnapshot = await firestore.collection("todos")
      .where("status", "==", "pending")
      .where("createdAt", "<=", threeDaysAgo)
      .get();

  const tokens = [];

  querySnapshot.forEach((doc) => {
    const token = doc.data().token;
    if (token) {
      tokens.push(token);
    }
  });

  const payload = {
    notification: {
      title: "Pending Task Notification",
      body: "You have tasks pending for more than 3 days.",
    },
  };

  if (tokens.length > 0) {
    await admin.messaging().sendToDevice(tokens, payload);
  }

  return null;
});

