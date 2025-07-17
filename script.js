// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add part
document.getElementById("addBtn").addEventListener("click", async () => {
  const name = document.getElementById("partName").value;
  const number = document.getElementById("partNumber").value;
  const category = document.getElementById("category").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);

  if (!name || !number || !category || !quantity || !price) {
    alert("Please fill all fields.");
    return;
  }

  try {
    await db.collection("parts").add({
      name,
      number,
      category,
      quantity,
      price,
      created: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Part added!");
    loadParts();
  } catch (error) {
    console.error("Error adding part:", error);
  }
});

// Load parts
async function loadParts() {
  const tableBody = document.getElementById("partsTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  const snapshot = await db.collection("parts").orderBy("created", "desc").get();
  snapshot.forEach(doc => {
    const part = doc.data();
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${part.name}</td>
      <td>${part.number}</td>
      <td>${part.category}</td>
      <td>${part.quantity}</td>
      <td>${part.price}</td>
    `;
  });
}

// Load on page start
loadParts();