const express = require('express'); //Requerir express
const path = require('path'); //Une directorio
const morgan = require('morgan'); //Registrar peticiones antes de procesarlas 
const mysql = require('mysql'); //Conexión mysql, modulo
const myConnection = require('express-myconnection');//Conexión mysql, modulo

const app = express(); // Inicializar por medio de una constante 

// Importando rutas
const contactRoutes = require('./routes/contact');  //Entra a la direccion especificada

// Configuración express
app.set('port', process.env.PORT || 3000); //revisa puerto en el S.O.
app.set('view engine', 'ejs'); //Motor de plantillas
app.set('views', path.join(__dirname, 'views')); //Une directorios, ruta de archivo ejecutado

// Funciones ejecutan antes de peticiones de usuarios (middlewares)
app.use(morgan('dev')); //Se ejecuta y recibe en dev
app.use(myConnection(mysql, { //Ejecuta funcion
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'agenda_web_ieliasr'
  }, 'single')); //Conexion al servidor
  app.use(express.urlencoded({extended: false})); //Requiere metodo, permite datos del formulario
  
// Rutas
app.use('/', contactRoutes); //Llegue a ruta inical del servidor, se ejecuta contactRoutes

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); //Complementos

// Iniciando el servidor mongodb

app.get ('/mongodb', (req,res) => {
  var mongodb = require ('mongodb').MongoClient;
  var url = 'mongodb+srv://ieliasr:ieliasr0913@agenda-web.nijcm.mongodb.net/unir_tarea?retryWrites=true&w=majority'
  mongodb.connect(url,function(error,databaes){
    if(error){
      console.log('no nos pudimos conectar');
      res.send('error mongo')
      throw error;
  }
  console.log('se conecto bien wiii');
  res.send ('bien mongo')
  });
})

// Puerto del servidor que escucha (Inicializa el servidor)
app. listen(app.get('port'), () => {
    console.log('Server on port 3000'); //Mensaje por consola
  });