const {onRequest, HttpsError, onCall} = require("firebase-functions/v2/https");

exports.sayHello = onRequest((req, res) => {
  res.status(200).send("Hello world!");
});

exports.addMessage = onCall((data, context) => {
  if (!context.auth) {
    throw new HttpsError("unauthenticated", "Request not authenticated");
  }
  const user = data.userName;
  return {result: `Iamge upload successfully for user ${user} .`};
});
