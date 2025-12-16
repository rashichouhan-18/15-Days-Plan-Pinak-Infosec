// A copy of your JSON data to use if local storage is empty
const initialData = [
  // ... (Paste your full JSON array here) ...
  { "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" } }, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" } },
  { "id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "address": { "street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771", "geo": { "lat": "-43.9509", "lng": "-34.4618" } }, "phone": "010-692-6593 x09125", "website": "anastasia.net", "company": { "name": "Deckow-Crist", "catchPhrase": "Proactive didactic contingency", "bs": "synergize scalable supply-chains" } },
  // ... (Include the rest of the 10 objects) ...
];

const STORAGE_KEY = 'userData';
const tableBody = document.getElementById('user-table-body');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-btn');

// --- 1. Utility Functions for Local Storage (C/R/U/D - Data Layer) ---

// READ: Load data from local storage or use initial data
function loadUsers() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        // Return parsed JSON data
        return JSON.parse(data);
    } else {
        // If nothing in storage, save the initial data and return it
        saveUsers(initialData);
        return initialData;
    }
}

// UPDATE: Save data to local storage
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// --- 2. Render Table (READ - UI Layer) ---

function renderTable(users) {
    // Clear the existing table content
    tableBody.innerHTML = ''; 

    users.forEach((user, index) => {
        const row = tableBody.insertRow();
        
        // S.No. (index + 1)
        row.insertCell().textContent = index + 1; 
        
        // Name
        row.insertCell().textContent = user.name; 
        
        // Email
        row.insertCell().textContent = user.email; 
        
        // Action Buttons
        const actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button class="action-btn view-btn" onclick="openViewModal(${user.id})">View</button>
            <button class="action-btn edit-btn" onclick="openEditModal(${user.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="openDeleteConfirmModal(${user.id})">Delete</button>
        `;
    });
}

// --- 3. Modal Control Functions ---

function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModalHandler() {
    modal.style.display = 'none';
    modalBody.innerHTML = ''; // Clear content on close
}

// Close modal when user clicks on (x) or outside the modal
closeModal.onclick = closeModalHandler;
window.onclick = function(event) {
    if (event.target === modal) {
        closeModalHandler();
    }
};


// --- 4. CRUD Operations & Modal Content (C/R/U/D - UI Logic) ---

// READ (View Pop-up)
function openViewModal(id) {
    const users = loadUsers();
    const user = users.find(u => u.id === id);

    if (user) {
        const content = `
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
            `;
        openModal(`User Details: ${user.name}`, content);
    }
}

// CREATE/UPDATE (Edit/Add Pop-up)
function openEditModal(id) {
    const users = loadUsers();
    const user = users.find(u => u.id === id);
    const isNew = !user; // True if no user found (for "Add" button)

    const title = isNew ? 'Add New User' : `Edit User: ${user.name}`;
    const currentName = user ? user.name : '';
    const currentEmail = user ? user.email : '';
    const currentUsername = user ? user.username : '';

    const content = `
        <form id="edit-form">
            <p>Name:</p>
            <input type="text" id="edit-name" value="${currentName}" required><br><br>
            <p>Email:</p>
            <input type="email" id="edit-email" value="${currentEmail}" required><br><br>
            <p>Username:</p>
            <input type="text" id="edit-username" value="${currentUsername}" required><br><br>
            
            <button type="submit" class="action-btn view-btn">${isNew ? 'Create User' : 'Save Changes'}</button>
        </form>
    `;

    openModal(title, content);

    // Attach submit handler after the form is in the DOM
    document.getElementById('edit-form').onsubmit = (e) => {
        e.preventDefault();
        const newName = document.getElementById('edit-name').value;
        const newEmail = document.getElementById('edit-email').value;
        const newUsername = document.getElementById('edit-username').value;
        
        if (isNew) {
            // CREATE Logic
            createUser(newName, newEmail, newUsername);
        } else {
            // UPDATE Logic
            updateUser(id, newName, newEmail, newUsername);
        }
    };
}

// Function called by the 'Add New User' button
document.getElementById('add-user-btn').onclick = () => openEditModal(null); 

function createUser(name, email, username) {
    const users = loadUsers();
    // Simple way to get a unique ID (Finds the highest ID and adds 1)
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
        id: newId,
        name: name,
        email: email,
        username: username,
        // Add default/placeholder values for nested objects
        address: { city: "New City" }, 
        company: { name: "New Company" }
    };

    users.push(newUser);
    saveUsers(users);
    renderTable(users);
    closeModalHandler();
    alert(`User ${name} created successfully!`);
}

function updateUser(id, name, email, username) {
    const users = loadUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index !== -1) {
        // Update only the fields we are editing
        users[index].name = name;
        users[index].email = email;
        users[index].username = username;
        
        saveUsers(users);
        renderTable(users);
        closeModalHandler();
        alert(`User ${name} updated successfully!`);
    }
}

// DELETE (Confirmation Pop-up)
function openDeleteConfirmModal(id) {
    const users = loadUsers();
    const user = users.find(u => u.id === id);

    if (user) {
        const content = `
            <p>Are you sure you want to delete the user: <strong>${user.name}</strong>?</p>
            <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Yes, Delete</button>
            <button class="action-btn view-btn" onclick="closeModalHandler()">No, Cancel</button>
        `;
        openModal('Confirm Deletion', content);
    }
}

function deleteUser(id) {
    let users = loadUsers();
    // Filter out the user with the given id (DELETE Logic)
    users = users.filter(u => u.id !== id);

    saveUsers(users);
    renderTable(users);
    closeModalHandler();
    alert('User deleted successfully!');
}

// --- 5. Initialization ---

// Load data and render the table when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const users = loadUsers();
    renderTable(users);
});