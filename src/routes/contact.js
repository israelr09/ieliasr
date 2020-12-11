//Metodo router, agrega rutas, se reutilizan
const express = require('express'); 
const router = express.Router(); //Almacena codigo en metodo router

const contactController = require('../controllers/contactController'); //Requerir el archivo de la ruta especificada

//URLS que maneja el servidor de la aplicación
router.get('/', contactController.list); // Hace consulta a la BD de MySQL
router.post('/add', contactController.save); //Escucha, resive datos de la ruta add
router.get('/delete/:id', contactController.delete); // Ejecuta la funcion escrita en controllers

router.get('/update/:id', contactController.edit); // Ejecuta funcion edit de contacts_edit.ejs
router.post('/update/:id', contactController.update);

module.exports = router; //Exportar codigo almacenado 