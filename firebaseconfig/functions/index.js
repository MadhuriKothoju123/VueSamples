/* eslint-disable max-len */
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

// Dependencies for callable functions.


// Initialize Firebase Admin with emulator settings

const {onCall, onRequest, HttpsError} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {schedule} = require("firebase-functions/v1/pubsub");
const {logger} = require("firebase-functions/v2");

// Dependencies for the addMessage function.
const {getDatabase} = require("firebase-admin/database");
const {beforeUserCreated, beforeUserSignedIn} = require("firebase-functions/v2/identity");
const {onValueWritten} = require("firebase-functions/v2/database");

const admin = initializeApp({
  databaseURL: "http://localhost:9014/?ns=dataaccess-7c490-default-rtdb", // (or your actual URL)
});



const db = getDatabase(admin);
// Saves a message to the Firebase Realtime Database but sanitizes the
// text by removing swearwords.
exports.loginSuccessMessage = onCall(async (request) => {
  // const uid = request.auth.uid;
  console.log(request.auth);
  // const emailVerified = request.auth.token.email_verified;

  const email = request.auth.token.email || null;
  if (request.auth.token) {
    return {message: `Welcome ${email}!`, status: true};
  } else {
    return {message: "Unauthorized user please signup!", status: false};
  }
});

exports.sayHello = onRequest(

    (req, res) => {
      res.status(200).send("Hello world!");
    },
);

exports.addComment = onRequest(async (req, res) => {
  const {userId, postId, comment} = req.body;
  const newCommentRef = db .ref("comments").push();
  await newCommentRef.set({userId, postId, comment, timestamp: Date.now()});
  res.status(200).send({message: "Comment added successfully"});
});


exports.addComment = onRequest(async (req, res) => {
  const {userId, postId, comment} = req.body;
  const newCommentRef = db .ref("comments").push();
  await newCommentRef.set({userId, postId, comment, timestamp: Date.now()});
  res.status(200).send({message: "Comment added successfully"});
});

exports.getPostComments =onRequest(async (req, res) => {
  const {userId} = req.query;
  const commentsRef = db.ref("comments").equalTo(userId).orderByChild("userId");
  const snapshot = await commentsRef.once("value");
  const comments = snapshot.val();
  console.log(comments);
  res.status(200).send(comments ? Object.values(comments) : []);
});

exports.beforecreated = beforeUserCreated((event) => {
  const user = event.data;
  console.log(user);
  console.log("hello");
  const allowDomain = "invalid.com";

  if (user.email.endsWith(`@${allowDomain}`)) {
    console.log("unveried");
    // eslint-disable-next-line max-len
    throw new HttpsError("invalid-email", `Only emails from the ${allowDomain} domain are allowed.`);
  }
});

exports. beforesignedin = beforeUserSignedIn((event) => {
  console.log(event.data);
  const user= event.data;
  console.log(user.emailVerified);
  if (!user.emailVerified=== true) {
    throw new HttpsError("user Email must be verified");
  }
  return event.credential;
});

exports.onWrittenFunctionDefault = onValueWritten("/posts/{postId}", (event) => {
  // console.log(`for post ${event.data.after.data.postId} the content is ${event.data.after.data.content}` );
  console.log("post created");
});



// eslint-disable-next-line max-len
exports.sendWelcomeMessage = schedule("every 5 minutes").onRun(async (context) => {
  console.log(' Welcome to Todo APP');
});

