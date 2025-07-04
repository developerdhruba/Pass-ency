import { auth } from './script.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.signUp = () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => location.href = "encrypt.html")
    .catch(alert);
};

window.signIn = () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => location.href = "encrypt.html")
    .catch(alert);
};