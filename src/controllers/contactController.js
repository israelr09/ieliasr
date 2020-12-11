const controller = {}; //Objeto

controller.list = (req, res) => { // Manda mensaje
    req.getConnection((err, conn) => { //Pide conexión a mysql
        conn.query('SELECT * FROM contact', (err, contacts) => { //Ejecuta consulta
         if (err) { //Si hay error
          res.json(err);
         }
         res.render('contacts', { //Renderisa vista
            data: contacts
         });
        });
      });
};

controller.save = (req, res) => { //Función a la ruta contactController
  const data = req.body;
  
  req.getConnection((err, connection) => { //Conexión
    const query = connection.query('INSERT INTO contact set ?', [data], (err, contact) => {
      res.redirect('/'); //Redirecciona a la ruta inicial
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM contact WHERE id = ?", [id], (err, rows) => {
      res.render('contacts_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params; //Dato optenido 
  const newContact = req.body; //Nuevos datos a actualizarr
  req.getConnection((err, conn) => { //Conexión

  conn.query('UPDATE contact set ? where id = ?', [newContact, id], (err, rows) => { //Actualiza datos
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params; //Dato optenido 
  
  req.getConnection((err, conn) => { //Conexión
    conn.query('DELETE FROM contact WHERE id = ?', [id], (err, rows) => {
      res.redirect('/'); //Redirecciona a la ruta inicial
    });
  });
}

module.exports = controller; // Exporta controlador  