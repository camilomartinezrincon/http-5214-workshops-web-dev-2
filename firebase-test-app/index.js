// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "test-project-2c898.firebaseapp.com",
  projectId: "test-project-2c898",
  storageBucket: "test-project-2c898.firebasestorage.app",
  messagingSenderId: "360200038908",
  appId: "1:360200038908:web:c7c8bbdfc982de1be9ea79",
};

const unixTimestampInSeconds = Math.floor(Date.now() / 1000);
let messagesList = document.getElementById("messages");
let nameField = document.getElementById("name");
let messageField = document.getElementById("message");
let button = document.getElementById("add");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const messages = ref(database, "/messages");

button.addEventListener("click", function () {
  let newMessages = push(messages);
  set(newMessages, {
    name: nameField.value,
    message: messageField.value,
    date: unixTimestampInSeconds,
  });
});

onValue(messages, (snapshot) => {
  messagesList.replaceChildren();
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    messagesList.innerHTML += `<li>${childData.message} ~ ${childData.name}</li>`;
  });
});
