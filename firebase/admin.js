const admin = require("firebase-admin");

const serviceAccount = require("./firebase-keys.json");

try {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swoou-eb5b0.firebaseio.com"
});    
} catch (err){}


export const db = admin.database()