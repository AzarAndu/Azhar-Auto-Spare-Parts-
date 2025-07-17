// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAbYF7orwgdL__bN",
  authDomain: "auto-parts-inventory-6e97e.firebaseapp.com",
  projectId: "auto-parts-inventory-6e97e",
  storageBucket: "auto-parts-inventory-6e97e.appspot.com",
  messagingSenderId: "21714181275",
  appId: "1:21714181275:web:80f880ecc00d2262277a3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const partsCollection = collection(db, "parts");

// Add part
document.getElementById("addPart").addEventListener("click", async () => {
  const partName = document.getElementById("partName").value;
  const partNumber = document.getElementById("partNumber").value;
  const category = document.getElementById("category").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);

  if (!partName || !partNumber || !category || isNaN(quantity) || isNaN(price)) {
    alert("Please fill all fields correctly!");
    return;
  }

  try {
    await addDoc(partsCollection, {
      partName,
      partNumber,
      category,
      quantity,
      price
    });
    alert("Part added!");
    loadParts();
  } catch (e) {
    console.error("Error adding part: ", e);
    alert("Failed to add part.");
  }
});

// Load parts into table
async function loadParts() {
  const partsTable = document.getElementById("partsTable");
  partsTable.innerHTML = ""; // Clear old rows

  const snapshot = await getDocs(partsCollection);
  snapshot.forEach(doc => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.partName}</td>
      <td>${data.partNumber}</td>
      <td>${data.category}</td>
      <td>${data.quantity}</td>
      <td>${data.price}</td>
    `;
    partsTable.appendChild(row);
  });
}

// Load on page start
loadParts();