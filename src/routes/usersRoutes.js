const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Listar Usuarios
router.get('/', usersController.listarUsuarios);

// Mostrar Detalles de Usuario
router.get('/:id', usersController.detalleUsuario);

// Crear Usuario
router.get('/register', usersController.mostrarFormularioCreacion); // Muestra el formulario para crear un usuario
router.post('/', usersController.create); // Procesa la creación de un usuario

// Editar Usuario
router.get('/edit/:id', usersController.mostrarFormularioEdicion);
router.put('/:id', usersController.actualizarUsuario);

// Eliminar Usuario
router.get('/delete/:id', usersController.mostrarConfirmacionEliminacion);
router.delete('/:id', usersController.eliminarUsuario);

module.exports = router;

