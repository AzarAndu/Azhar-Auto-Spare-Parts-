function addPart() {
  const name = document.getElementById('partName').value;
  const no = document.getElementById('partNo').value;
  const category = document.getElementById('category').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseInt(document.getElementById('price').value);
  if (!name || !no || !category || !qty || !price) return alert("Please fill all fields");

  const total = qty * price;
  const table = document.getElementById('partsTable');
  const row = table.insertRow(-1);
  row.innerHTML = \`
    <td>\${name}</td>
    <td>\${no}</td>
    <td>\${category}</td>
    <td>\${qty}</td>
    <td>\${price}</td>
    <td>\${total}</td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
  \`;

  saveToLocal();
  clearInputs();
}

function clearInputs() {
  document.getElementById('partName').value = "";
  document.getElementById('partNo').value = "";
  document.getElementById('category').value = "";
  document.getElementById('qty').value = "";
  document.getElementById('price').value = "";
}

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  saveToLocal();
}

function clearAll() {
  const table = document.getElementById('partsTable');
  while (table.rows.length > 1) table.deleteRow(1);
  localStorage.removeItem('parts');
}

function searchParts() {
  const input = document.getElementById('search').value.toLowerCase();
  const table = document.getElementById('partsTable');
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const partName = row.cells[0].textContent.toLowerCase();
    row.style.display = partName.includes(input) ? '' : 'none';
  }
}

function saveToLocal() {
  const table = document.getElementById('partsTable');
  let data = [];
  for (let i = 1; i < table.rows.length; i++) {
    let cells = table.rows[i].cells;
    data.push([cells[0].innerText, cells[1].innerText, cells[2].innerText, cells[3].innerText, cells[4].innerText]);
  }
  localStorage.setItem('parts', JSON.stringify(data));
}

function loadFromLocal() {
  const data = JSON.parse(localStorage.getItem('parts') || "[]");
  for (let item of data) {
    const table = document.getElementById('partsTable');
    const row = table.insertRow(-1);
    const total = item[3] * item[4];
    row.innerHTML = \`
      <td>\${item[0]}</td>
      <td>\${item[1]}</td>
      <td>\${item[2]}</td>
      <td>\${item[3]}</td>
      <td>\${item[4]}</td>
      <td>\${total}</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
    \`;
  }
}

function exportToExcel() {
  let table = document.getElementById("partsTable");
  let rows = [];
  for (let i = 0, row; row = table.rows[i]; i++) {
    let cells = Array.from(row.cells).map(cell => cell.innerText);
    rows.push(cells.join(","));
  }
  let csv = rows.join("\n");
  let blob = new Blob([csv], { type: 'text/csv' });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "inventory.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

window.onload = loadFromLocal;