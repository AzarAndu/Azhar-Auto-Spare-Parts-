// Import Firebase functions (no need if you're using CDN)
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyABYF7orwgrdL_oYyNydHAzjrTftucm1iY",
  authDomain: "auto-parts-inventory-6e97e.firebaseapp.com",
  projectId: "auto-parts-inventory-6e97e",
  storageBucket: "auto-parts-inventory-6e97e.appspot.com",
  messagingSenderId: "21714181275",
  appId: "1:21714181275:web:80f880eec00d22622f7a3e"
};

// Import Firebase modules from global (for CDN)
const { initializeApp } = firebase;
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } = firebase.firestore;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const partsRef = collection(db, "parts");

// Add part
async function addPart() {
  const name = document.getElementById('partName').value;
  const no = document.getElementById('partNo').value;
  const category = document.getElementById('category').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseInt(document.getElementById('price').value);
  const total = qty * price;

  if (!name || !no || !category || isNaN(qty) || isNaN(price)) {
    alert("Please fill all fields correctly");
    return;
  }

  await addDoc(partsRef, { name, no, category, qty, price, total });
  clearInputs();
  loadParts();
}

// Load parts to table
async function loadParts() {
  const table = document.getElementById('partsTable');
  while (table.rows.length > 1) table.deleteRow(1);

  const snapshot = await getDocs(partsRef);
  snapshot.forEach(docSnap => {
    const part = docSnap.data();
    const row = table.insertRow(-1);
    row.innerHTML = `
      <td>${part.name}</td>
      <td>${part.no}</td>
      <td>${part.category}</td>
      <td>${part.qty}</td>
      <td>${part.price}</td>
      <td>${part.total}</td>
      <td><button onclick="deletePart('${docSnap.id}')">Delete</button></td>
    `;
  });
}

// Delete part
async function deletePart(id) {
  await deleteDoc(doc(db, "parts", id));
  loadParts();
}

// Clear input fields
function clearInputs() {
  document.getElementById('partName').value = "";
  document.getElementById('partNo').value = "";
  document.getElementById('category').value = "";
  document.getElementById('qty').value = "";
  document.getElementById('price').value = "";
}

window.onload = loadParts;
