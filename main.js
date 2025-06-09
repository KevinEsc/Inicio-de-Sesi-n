const loginForm = document.getElementById("loginForm");
const addUserFormContainer = document.getElementById("addUserFormContainer");
const addUserForm = document.getElementById("addUserForm");
const userCards = document.getElementById("userCards");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

let users = [];
let isAdmin = false;

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        isAdmin = true;
        successMessage.textContent = "Acceso concedido ✅";
        errorMessage.textContent = "";
        addUserFormContainer.style.display = "block";
        loginForm.reset();
    } else {
        errorMessage.textContent = "Credenciales incorrectas ❌";
        successMessage.textContent = "";
    }
});

addUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = new Date(document.getElementById("dob").value);
    const email = document.getElementById("email").value.trim();
    const position = document.getElementById("position").value.trim();
    const joinDate = new Date(document.getElementById("joinDate").value);

    // Validaciones
    if (!firstName || !lastName || !dob || !email || !position || !joinDate) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const ageAtJoin = (joinDate - dob) / (1000 * 60 * 60 * 24 * 365.25);
    if (ageAtJoin < 18) {
        alert("El empleado debe tener al menos 18 años al ingresar.");
        return;
    }

    if (users.some(user => user.email === email)) {
        alert("El correo ya existe. Ingrese uno diferente.");
        return;
    }

    const confirmed = confirm("¿Deseas agregar este usuario?");
    if (!confirmed) return;

const newUser = {
    id: Date.now(),
    fullName: `${firstName} ${lastName}`,
    email,
    position
};


    users.push(newUser);
    renderUsers();
    addUserForm.reset();
});

function renderUsers() {
    userCards.innerHTML = "";
    users.forEach(user => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        col.innerHTML = `
    <div class="card user-card shadow-sm">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <img src="https://placekitten.com/50/50" class="rounded-circle me-3" alt="Foto">
                <div class="flex-grow-1">
                    <h5 class="mb-1">${user.fullName}</h5>
                    <p class="mb-0"><strong>Correo:</strong> ${user.email}</p>
                    <p class="mb-0"><strong>Cargo:</strong> ${user.position}</p>
                </div>
                <button class="btn btn-danger btn-sm ms-2" onclick="deleteUser(${user.id})">Eliminar</button>
            </div>
        </div>
    </div>
`;


        userCards.appendChild(col);
    });
}


function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUsers();
}

