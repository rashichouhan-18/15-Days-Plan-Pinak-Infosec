const initialData = [
  {"id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": {"street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874"}, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": {"name": "Romaguera-Crona"}},
  {"id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "address": {"street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771"}, "phone": "010-692-6593 x09125", "website": "anastasia.net", "company": {"name": "Deckow-Crist"}},
  {"id": 3, "name": "Clementine Bauch", "username": "Samantha", "email": "Nathan@yesenia.net", "address": {"street": "Douglas Extension", "suite": "Suite 847", "city": "McKenziehaven", "zipcode": "59590-4157"}, "phone": "1-463-123-4447", "website": "ramiro.info", "company": {"name": "Romaguera-Jacobson"}},
  {"id": 4, "name": "Patricia Lebsack", "username": "Karianne", "email": "Julianne.OConner@kory.org", "address": {"street": "Hoeger Mall", "suite": "Apt. 692", "city": "South Elvis", "zipcode": "53919-4257"}, "phone": "493-170-9623 x156", "website": "kale.biz", "company": {"name": "Robel-Corkery"}},
  {"id": 5, "name": "Chelsey Dietrich", "username": "Kamren", "email": "Lucio_Hettinger@annie.ca", "address": {"street": "Skiles Walks", "suite": "Suite 351", "city": "Roscoeview", "zipcode": "33263"}, "phone": "(254)954-1289", "website": "demarco.info", "company": {"name": "Keebler LLC"}},
  {"id": 6, "name": "Mrs. Dennis Schulist", "username": "Leopoldo_Corkery", "email": "Karley_Dach@jasper.info", "address": {"street": "Norberto Crossing", "suite": "Apt. 950", "city": "South Christy", "zipcode": "23505-1337"}, "phone": "1-477-935-8478 x6430", "website": "ola.org", "company": {"name": "Considine-Lockman"}},
  {"id": 7, "name": "Kurtis Weissnat", "username": "Elwyn.Skiles", "email": "Telly.Hoeger@billy.biz", "address": {"street": "Rex Trail", "suite": "Suite 280", "city": "Howemouth", "zipcode": "58804-1099"}, "phone": "210.067.6132", "website": "elvis.io", "company": {"name": "Johns Group"}},
  {"id": 8, "name": "Nicholas Runolfsdottir V", "username": "Maxime_Nienow", "email": "Sherwood@rosamond.me", "address": {"street": "Ellsworth Summit", "suite": "Suite 729", "city": "Aliyaview", "zipcode": "45169"}, "phone": "586.493.6943 x140", "website": "jacynthe.com", "company": {"name": "Abernathy Group"}},
  {"id": 9, "name": "Glenna Reichert", "username": "Delphine", "email": "Chaim_McDermott@dana.io", "address": {"street": "Dayna Park", "suite": "Suite 449", "city": "Bartholomebury", "zipcode": "76495-3109"}, "phone": "(775)976-6794 x41206", "website": "conrad.com", "company": {"name": "Yost and Sons"}},
  {"id": 10, "name": "Clementina DuBuque", "username": "Moriah.Stanton", "email": "Rey.Padberg@karina.biz", "address": {"street": "Kattie Turnpike", "suite": "Suite 198", "city": "Lebsackbury", "zipcode": "31428-2261"}, "phone": "024-648-3804", "website": "ambrose.net", "company": {"name": "Hoeger LLC"}}
];

const STORAGE_KEY = 'userData';

// Data Management
const loadUsers = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialData;
const saveUsers = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// Table View Rendering
function renderTable(users) {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = users.map((u, i) => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-4">${i + 1}</td>
            <td class="p-4 font-medium">${u.name}</td>
            <td class="p-4 text-gray-600">${u.email}</td>
            <td class="p-4 flex justify-center gap-2">
                <button onclick="viewUser(${u.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">View</button>
                <button onclick="openEditModal(${u.id})" class="bg-amber-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                <button onclick="deleteUser(${u.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Card View Rendering
function renderCards(users) {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = users.map(u => `
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
            <div class="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">Product Image</div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">${u.name}</h3>
            <p class="text-sm text-gray-500 mb-2">${u.email}</p>
            <p class="text-xs font-semibold uppercase text-indigo-600 mb-4">${u.company.name}</p>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <button onclick="viewUser(${u.id})" class="text-blue-600 font-bold hover:underline">View</button>
                <div class="flex gap-2">
                    <button onclick="openEditModal(${u.id})" class="text-amber-600 text-sm">Edit</button>
                    <button onclick="deleteUser(${u.id})" class="text-red-600 text-sm">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Logic
function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const allUsers = loadUsers();
    const filtered = allUsers.filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));

    const tableContainer = document.getElementById('table-container');
    const cardGrid = document.getElementById('card-grid');

    if (query === "") {
        tableContainer.classList.remove('hidden');
        cardGrid.classList.add('hidden');
        renderTable(allUsers);
    } else {
        tableContainer.classList.add('hidden');
        cardGrid.classList.remove('hidden');
        renderCards(filtered);
    }
}

// CRUD Actions
function viewUser(id) {
    const user = loadUsers().find(u => u.id === id);
    openModal(`Overview: ${user.name}`, `
        <div class="space-y-2">
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        </div>
    `);
}

function deleteUser(id) {
    if(confirm("Confirm deletion?")) {
        const updated = loadUsers().filter(u => u.id !== id);
        saveUsers(updated);
        handleSearch(); // Refresh current view
    }
}

// Modal Control
function openModal(title, content) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal').classList.remove('hidden');
}
function closeModal() { document.getElementById('modal').classList.add('hidden'); }

// Init
window.onload = () => {
    // If you need a fresh start with 10 items, uncomment below once:
    // localStorage.removeItem(STORAGE_KEY); 
    renderTable(loadUsers());
};