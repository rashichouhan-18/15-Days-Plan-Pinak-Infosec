const initialData = [
  {"id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": {"street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": {"lat": "-37.3159", "lng": "81.1496"}}, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": {"name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets"}},
  {"id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "address": {"street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771", "geo": {"lat": "-43.9509", "lng": "-34.4618"}}, "phone": "010-692-6593 x09125", "website": "anastasia.net", "company": {"name": "Deckow-Crist", "catchPhrase": "Proactive didactic contingency", "bs": "synergize scalable supply-chains"}},
  {"id": 3, "name": "Clementine Bauch", "username": "Samantha", "email": "Nathan@yesenia.net", "address": {"street": "Douglas Extension", "suite": "Suite 847", "city": "McKenziehaven", "zipcode": "59590-4157", "geo": {"lat": "-68.6102", "lng": "-47.0653"}}, "phone": "1-463-123-4447", "website": "ramiro.info", "company": {"name": "Romaguera-Jacobson", "catchPhrase": "Face to face bifurcated interface", "bs": "e-enable strategic applications"}},
  {"id": 4, "name": "Patricia Lebsack", "username": "Karianne", "email": "Julianne.OConner@kory.org", "address": {"street": "Hoeger Mall", "suite": "Apt. 692", "city": "South Elvis", "zipcode": "53919-4257", "geo": {"lat": "29.4572", "lng": "-164.2990"}}, "phone": "493-170-9623 x156", "website": "kale.biz", "company": {"name": "Robel-Corkery", "catchPhrase": "Multi-tiered zero tolerance productivity", "bs": "transition cutting-edge web services"}},
  {"id": 5, "name": "Chelsey Dietrich", "username": "Kamren", "email": "Lucio_Hettinger@annie.ca", "address": {"street": "Skiles Walks", "suite": "Suite 351", "city": "Roscoeview", "zipcode": "33263", "geo": {"lat": "-31.8129", "lng": "62.5342"}}, "phone": "(254)954-1289", "website": "demarco.info", "company": {"name": "Keebler LLC", "catchPhrase": "User-centric fault-tolerant solution", "bs": "revolutionize end-to-end systems"}},
  {"id": 6, "name": "Mrs. Dennis Schulist", "username": "Leopoldo_Corkery", "email": "Karley_Dach@jasper.info", "address": {"street": "Norberto Crossing", "suite": "Apt. 950", "city": "South Christy", "zipcode": "23505-1337", "geo": {"lat": "-71.4197", "lng": "71.7478"}}, "phone": "1-477-935-8478 x6430", "website": "ola.org", "company": {"name": "Considine-Lockman", "catchPhrase": "Synchronised bottom-line interface", "bs": "e-enable innovative applications"}},
  {"id": 7, "name": "Kurtis Weissnat", "username": "Elwyn.Skiles", "email": "Telly.Hoeger@billy.biz", "address": {"street": "Rex Trail", "suite": "Suite 280", "city": "Howemouth", "zipcode": "58804-1099", "geo": {"lat": "24.8918", "lng": "21.8984"}}, "phone": "210.067.6132", "website": "elvis.io", "company": {"name": "Johns Group", "catchPhrase": "Configurable multimedia task-force", "bs": "generate enterprise e-tailers"}},
  {"id": 8, "name": "Nicholas Runolfsdottir V", "username": "Maxime_Nienow", "email": "Sherwood@rosamond.me", "address": {"street": "Ellsworth Summit", "suite": "Suite 729", "city": "Aliyaview", "zipcode": "45169", "geo": {"lat": "-14.3990", "lng": "-120.7677"}}, "phone": "586.493.6943 x140", "website": "jacynthe.com", "company": {"name": "Abernathy Group", "catchPhrase": "Implemented secondary concept", "bs": "e-enable extensible e-tailers"}},
  {"id": 9, "name": "Glenna Reichert", "username": "Delphine", "email": "Chaim_McDermott@dana.io", "address": {"street": "Dayna Park", "suite": "Suite 449", "city": "Bartholomebury", "zipcode": "76495-3109", "geo": {"lat": "24.6463", "lng": "-168.8889"}}, "phone": "(775)976-6794 x41206", "website": "conrad.com", "company": {"name": "Yost and Sons", "catchPhrase": "Switchable contextually-based project", "bs": "aggregate real-time technologies"}},
  {"id": 10, "name": "Clementina DuBuque", "username": "Moriah.Stanton", "email": "Rey.Padberg@karina.biz", "address": {"street": "Kattie Turnpike", "suite": "Suite 198", "city": "Lebsackbury", "zipcode": "31428-2261", "geo": {"lat": "-38.2386", "lng": "57.2232"}}, "phone": "024-648-3804", "website": "ambrose.net", "company": {"name": "Hoeger LLC", "catchPhrase": "Centralized empowering task-force", "bs": "target end-to-end models"}},
  {"id": 11, "name": "Clementina DuBuque", "username": "Moriah.Stanton", "email": "Rey.Padberg@karina.biz", "address": {"street": "Kattie Turnpike", "suite": "Suite 198", "city": "Lebsackbury", "zipcode": "31428-2261", "geo": {"lat": "-38.2386", "lng": "57.2232"}}, "phone": "024-648-3804", "website": "ambrose.net", "company": {"name": "Hoeger LLC", "catchPhrase": "Centralized empowering task-force", "bs": "target end-to-end models"}}
];

const STORAGE_KEY = 'userData';
const tableBody = document.getElementById('user-table-body');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-btn');

function loadUsers() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    } else {
        saveUsers(initialData);
        return initialData;
    }
}
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}


function renderTable(users) {
    tableBody.innerHTML = ''; 

    users.forEach((user, index) => {
        const row = tableBody.insertRow();
        
        row.insertCell().textContent = index + 1; 
        
        row.insertCell().textContent = user.name; 
        
        row.insertCell().textContent = user.email; 
        
        const actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button class="action-btn view-btn" onclick="openViewModal(${user.id})">View</button>
            <button class="action-btn edit-btn" onclick="openEditModal(${user.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="openDeleteConfirmModal(${user.id})">Delete</button>
        `;
    });
}

function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModalHandler() {
    modal.style.display = 'none';
    modalBody.innerHTML = ''; 
}

closeModal.onclick = closeModalHandler;
window.onclick = function(event) {
    if (event.target === modal) {
        closeModalHandler();
    }
};

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

function openEditModal(id) {
    const users = loadUsers();
    const user = users.find(u => u.id === id);
    const isNew = !user; 

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

    document.getElementById('edit-form').onsubmit = (e) => {
        e.preventDefault();
        const newName = document.getElementById('edit-name').value;
        const newEmail = document.getElementById('edit-email').value;
        const newUsername = document.getElementById('edit-username').value;
        
        if (isNew) {
            createUser(newName, newEmail, newUsername);
        } else {
            updateUser(id, newName, newEmail, newUsername);
        }
    };
}

document.getElementById('add-user-btn').onclick = () => openEditModal(null); 

function createUser(name, email, username) {
    const users = loadUsers();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
        id: newId,
        name: name,
        email: email,
        username: username,
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
        users[index].name = name;
        users[index].email = email;
        users[index].username = username;
        
        saveUsers(users);
        renderTable(users);
        closeModalHandler();
        alert(`User ${name} updated successfully!`);
    }
}
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
    users = users.filter(u => u.id !== id);

    saveUsers(users);
    renderTable(users);
    closeModalHandler();
    alert('User deleted successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
    const users = loadUsers();
    renderTable(users);
}); 
function init() {
    let users = JSON.parse(localStorage.getItem('userData'));

    if (!users || users.length === 0) {
        users = initialData;
        localStorage.setItem('userData', JSON.stringify(users));
    }
    
    renderTable(users);
}
window.onload = init;



