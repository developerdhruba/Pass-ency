import { auth, db } from './script.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

function simpleEncrypt(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

window.encryptAndSave = () => {
  const password = document.getElementById("rawPass").value;
  const encrypted = simpleEncrypt(password);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await addDoc(collection(db, "users", user.uid, "vault"), {
        original: password,
        encrypted,
        timestamp: Date.now()
      });

      document.getElementById("output").innerText = "Encrypted Password: " + encrypted;

      // Show the decrypt button and pass encrypted as URL param
      const link = document.getElementById("decryptLink");
      link.href = `decrypt.html?enc=${encodeURIComponent(encrypted)}`;
      link.style.display = "inline-block";
    } else {
      alert("User not signed in.");
    }
  });
};
