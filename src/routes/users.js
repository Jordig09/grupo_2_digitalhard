const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Listar Usuarios
router.get('/', usersController.index);

// Mostrar Detalles de Usuario
router.get('/:id', usersController.detalleUsuario);

// Crear Usuario
router.get('/create', usersController.formCreateUser);
router.post('/', usersController.create); // Procesa la creación de un usuario

// Editar Usuario
router.get('/:id/edit', usersController.formEditUser);
router.put('/:id', usersController.actualizarUsuario);

// Eliminar Usuario
router.get('/:id/delete', usersController.mostrarConfirmacionEliminacion);
router.delete('/:id', usersController.eliminarUsuario);

module.exports = router;

