/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {initializeApp, applicationDefault} = require("firebase-admin/app");
const nodemailer = require("nodemailer");
const {
  onDocumentUpdated,
} =require( "firebase-functions/v2/firestore");
const {getFirestore} = require("firebase-admin/firestore");
initializeApp({
  projectId: "vuewithfirebase-f8f63",
  credential: applicationDefault(),
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kothojumadhuri2000@gmail.com",
    pass: "lins nflb iagt rlon",
  },
});
const db = getFirestore();
db.settings({
  host: "localhost:8089",
  ssl: false,
});
exports.updatedVehicle = onDocumentUpdated("vehicles/{id}", async (event) => {
  const newValue = event.data.after.data();

  await getAdminUsersByCompanyId(newValue.companyName)
      .then((adminUsers) => {
        console.log("Admin Users:", adminUsers);
        const mailOptions = {
          from: "kothojumadhuri2000@gmail.com",
          to: adminUsers[0].email,
          subject: "Document Updated in Firestore",
          // eslint-disable-next-line max-len
          text: ` ${newValue.name} vehicle has been updated in Firestore by  ${newValue.userEditOrAdd }}`,
        };
        return transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return;
          }
          console.log("Email sent:", info.response);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
});

const getAdminUsersByCompanyId = async (companyId) => {
  try {
    const usersCollectionRef = db.collection("users");
    console.log(companyId);
    // Create a query against the collection.
    const q = usersCollectionRef.where("companyId", "==", companyId)
        .where("role", "==", "admin");

    // Execute the query
    const querySnapshot = await q.get();

    // Process the query results
    const adminUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    console.log("Admin users:", adminUsers);
    return adminUsers;
  } catch (error) {
    console.error("Error getting admin users:", error);
    throw error;
  }
};

