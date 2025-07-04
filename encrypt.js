import { auth, db } from './script.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// AES encrypt using user UID as the password
async function encryptAES(text, uid) {
  const enc = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(uid),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("your-unique-salt"),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );

  return {
    encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...iv))
  };
}

window.encryptAndSave = () => {
  const password = document.getElementById("rawPass").value;

  onAuthStateChanged(auth, async (user) => {
    if (!user) return alert("Not signed in.");

    const { encrypted, iv } = await encryptAES(password, user.uid);

    await addDoc(collection(db, "users", user.uid, "vault"), {
      encrypted,
      iv,
      timestamp: Date.now()
    });

    document.getElementById("output").innerText = `Encrypted Password: ${encrypted}`;
  });
};
