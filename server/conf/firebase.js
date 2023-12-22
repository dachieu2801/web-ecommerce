const { initializeApp } = require("firebase/app")
const { getStorage } = require("firebase/storage")
const env = require('../env')

const firebaseConfig = {
  apiKey: env.FIRE_BASE_APIKEY,
  authDomain: env.AUTHOR_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASURENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = getStorage(app);