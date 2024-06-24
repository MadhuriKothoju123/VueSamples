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

// const {getFirestore} = require("firebase-admin/firestore");
// const {schedule} = require("firebase-functions/v1/pubsub");
// const {initializeApp} = require( "firebase-admin/app");

// const admin = require("firebase-admin");

// const admin = initializeApp({
//   databaseURL: "http://localhost:9014/?ns=dataaccess-7c490-default-rtdb", // (or your actual URL)
// });

// eslint-disable-next-line max-len
// exports.sendPendingTasksNotifications = schedule("every 24 hours").onRun(async (context) => {
//   const today = new Date();
//   today.setDate(today.getDate() - 3);
//   const threeDaysAgo = today.toISOString().split("T")[0];

//   const querySnapshot = await firestore.collection("todos")
//       .where("status", "==", "pending")
//       .where("createdAt", "<=", threeDaysAgo)
//       .get();

//   const tokens = [];

//   querySnapshot.forEach((doc) => {
//     const token = doc.data().token;
//     if (token) {
//       tokens.push(token);
//     }
//   });

//   const payload = {
//     notification: {
//       title: "Pending Task Notification",
//       body: "You have tasks pending for more than 3 days.",
//     },
//   };

//   if (tokens.length > 0) {
//     await admin.messaging().sendToDevice(tokens, payload);
//   }

//   return null;
// });
const {initializeApp} = require("firebase-admin");
const {firestore} = require("firebase-functions/v2");
const {
  onDocumentCreated,
  onDocumentWritten,
} =require( "firebase-functions/v2/firestore");


initializeApp();

firestore.settings({
  host: "localhost:8080",
  ssl: false,
});
exports.createuser = onDocumentCreated("todos/{todoId}", (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
  } else {
    console.log("No data associated with the event", snapshot);
  }
});

exports.modifyuser = onDocumentWritten("todos/{todoId}", (event) => {
  // Get an object with the current document values.
  // If the document does not exist, it was deleted
  const document = event.data.after.data();

  // Get an object with the previous document values
  const previousValues = event.data.before.data();
  console.log("there are chnages in document,", document, previousValues );
});

