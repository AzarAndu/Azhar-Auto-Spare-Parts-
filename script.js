// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyABYF7orwgrdL_oYyNydHAzjrTftucm1iY",
  authDomain: "auto-parts-inventory-6e97e.firebaseapp.com",
  projectId: "auto-parts-inventory-6e97e",
  storageBucket: "auto-parts-inventory-6e97e.appspot.com",
  messagingSenderId: "21714181275",
  appId: "1:21714181275:web:80f880eec00d22622f7a3e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const partsRef = db.collection("parts");

// Add Part
async function addPart() {
  const name = document.getElementById('partName').value.trim();
  const no = document.getElementById('partNo').value.trim();
  const category = document.getElementById('category').value.trim();
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseInt(document.getElementById('price').value);
  const total = qty * price;

  if (!name || !no || !category || !qty || !price) {
    alert("Please fill all fields");
    return;
  }

  await partsRef.add({ name, no, category, qty, price, total });
  clearInputs();
  loadParts();
}

// Load All Parts
async function loadParts() {
  const table = document.getElementById('partsTable');
  while (table.rows.length > 1) table.deleteRow(1);

  const snapshot = await partsRef.get();
  snapshot.forEach(doc => {
    const part = doc.data();
    const row = table.insertRow();
    row.innerHTML = `
      <td>${part.name}</td>
      <td>${part.no}</td>
      <td>${part.category}</td>
      <td>${part.qty}</td>
      <td>${part.price}</td>
      <td>${part.total}</td>
      <td><button onclick="deletePart('${doc.id}')">Delete</button></td>
    `;
  });
}

// Delete Part
async function deletePart(id) {
  await partsRef.doc(id).delete();
  loadParts();
}

// Clear Inputs
function clearInputs() {
  ['partName', 'partNo', 'category', 'qty', 'price'].forEach(id => {
    document.getElementById(id).value = "";
  });
}

// Load on start
window.onload = loadParts;