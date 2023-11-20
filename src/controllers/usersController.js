const database = require("../data/database");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

function getUsers() {
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  return users;
}

const usersController = {
  // Listar Usuarios
  index: (req, res) => {
    const users = getUsers();
    res.render('users-list.ejs', {
      users, 
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "/css/styles.css",
        "/css/productList.css",
      ]
    });
  },

  
  detalleUsuario: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find(u => u.id === req.params.id);
    res.render('details-user', { user }); 
  },

  formCreateUser: (req, res) => {
    res.render('create-user.ejs', {
      users, 
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "/css/styles.css",
        "/css/productList.css",
      ]
    }); 
  },

  
  create: (req, res) => {
    const users = getUsers(); 
    const userToCreate = {
      id: users[users.length - 1].id + 1,
      ...req.body,
      profilePicture: "default-profile.png",
    };
    users.push(userToCreate);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.redirect('/users');
  },

  formEditUser: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find(u => u.id == req.params.id);
  
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
  
    res.render('edit-user.ejs', { user, 
      styles: [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "/css/normalize.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
        "/css/styles.css",
        "/css/productList.css",
      ]
    });
  },

  // Procesar Actualización de Usuario
  actualizarUsuario: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const index = users.findIndex(u => u.id === req.params.id);
    users[index] = { ...users[index], ...req.body };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.redirect('/users');
  },

  // Mostrar Confirmación de Eliminación de Usuario
  mostrarConfirmacionEliminacion: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find(u => u.id === req.params.id);
    res.render('delete-user', { user });
  },

  // Procesar Eliminación de Usuario
  eliminarUsuario: (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    users = users.filter(u => u.id !== req.params.id);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.redirect('/users');
  },
};

module.exports = usersController;
