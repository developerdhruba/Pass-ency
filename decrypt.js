import { auth, db } from './script.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

function simpleDecrypt(encrypted) {
  try {
    return decodeURIComponent(escape(atob(encrypted)));
  } catch {
    return "Invalid encrypted text!";
  }
}

window.decrypt = () => {
  const input = document.getElementById("encInput").value;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const vaultRef = collection(db, "users", user.uid, "vault");
      const snapshot = await getDocs(vaultRef);

      let found = false;
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.encrypted === input) {
          const result = simpleDecrypt(input);
          document.getElementById("output").innerText = "Original Password: " + result;
          found = true;
        }
      });

      if (!found) {
        document.getElementById("output").innerText = "Encrypted password not found in your account.";
      }
    } else {
      alert("Please sign in.");
    }
  });
};
