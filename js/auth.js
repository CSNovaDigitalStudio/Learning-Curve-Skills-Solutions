import { app } from "./firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created!");
        window.location.href = "dashboard.html";
      })
      .catch(err => alert(err.message));
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => {
        document.getElementById("msg").innerText = err.message;
      });
  });
}

// LOGOUT
if (window.location.pathname.includes("logout.html")) {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
}

// PROTECT PAGES
document.body.style.display = "none";

onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("dashboard.html")) {
    window.location.href = "login.html";
  } else {
    document.body.style.display = "block";
  }

  if (user && document.getElementById("userEmail")) {
    document.getElementById("userEmail").innerText =
      "Logged in as: " + user.email;
  }
});