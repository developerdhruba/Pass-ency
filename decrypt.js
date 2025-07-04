import { auth, db } from './script.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function decryptAES(encryptedB64, ivB64, uid) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

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
    ["decrypt"]
  );

  const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
  const encrypted = Uint8Array.from(atob(encryptedB64), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  return dec.decode(decrypted);
}

window.decrypt = () => {
  const encryptedInput = document.getElementById("encInput").value;

  onAuthStateChanged(auth, async (user) => {
    if (!user) return alert("Not signed in");

    const vaultRef = collection(db, "users", user.uid, "vault");
    const snapshot = await getDocs(vaultRef);

    let found = false;
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.encrypted === encryptedInput) {
        const original = await decryptAES(data.encrypted, data.iv, user.uid);
        document.getElementById("output").innerText = "Decrypted: " + original;
        found = true;
        break;
      }
    }

    if (!found) {
      document.getElementById("output").innerText = "Encrypted password not found in your vault.";
    }
  });
};
