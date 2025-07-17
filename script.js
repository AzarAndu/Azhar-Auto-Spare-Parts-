// Firebase v10 Modular SDK
const firebaseConfig = {
  apiKey: "AIzaSyABYF7orwgrdL_oYyNydHAzjrTftucm1iY",
  authDomain: "auto-parts-inventory-6e97e.firebaseapp.com",
  projectId: "auto-parts-inventory-6e97e",
  storageBucket: "auto-parts-inventory-6e97e.appspot.com",
  messagingSenderId: "21714181275",
  appId: "1:21714181275:web:80f880eec00d22622f7a3e"
};

// Import from Firebase global object
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const partsRef = db.collection("parts");

async function addPart() {
  const name = document.getElementById('partName').value;
  const no = document.getElementById('partNo').value;
  const category = document.getElementById('category').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseInt(document.getElementById('price').value);
  const total = qty * price;

  if (!name || !no || !category || isNaN(qty) || isNaN(price)) {
    alert("Please fill all fields");
    return;
  }

  await partsRef.add({ name, no, category, qty, price, total });
  clearInputs();
  loadParts();
}

async function loadParts() {
  const table = document.getElementById('partsTable');
  while (table.rows.length > 1) table.deleteRow(1);

  const snapshot = await partsRef.get();
  snapshot.forEach(doc => {
    const part = doc.data();
    const row = table.insertRow(-1);
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

async function deletePart(id) {
  await partsRef.doc(id).delete();
  loadParts();
}

function clearInputs() {
  document.getElementById('partName').value = "";
  document.getElementById('partNo').value = "";
  document.getElementById('category').value = "";
  document.getElementById('qty').value = "";
  document.getElementById('price').value = "";
}

window.onload = loadParts;