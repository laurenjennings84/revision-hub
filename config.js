// ===== STEP 6 OF THE GUIDE: paste your Firebase settings here =====
// Replace each PASTE_... value with the matching value Firebase shows you.
export const FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_AUTH_DOMAIN",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_STORAGE_BUCKET",
  messagingSenderId: "PASTE_MESSAGING_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// Google accounts that see the parent dashboard and can add question packs.
// Use the same addresses as in the Firestore rules (step 5).
export const PARENT_EMAILS = [
  "your.email@gmail.com",
  "peters.dad@gmail.com"
];
