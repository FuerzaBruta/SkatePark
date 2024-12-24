const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
app.set('views', path.join(__dirname, 'views')); // Establecer la ruta de las vistas
app.set('view engine', 'hbs');


// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { user: null }); // Cambia 'null' por la lógica de sesión si la tienes
});

// Página de inicio de sesión
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Lógica de autenticación aquí
  res.redirect('/dashboard'); // Redirigir al dashboard tras iniciar sesión
});

// Página de registro
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Lógica de registro aquí
  res.redirect('/login'); // Redirigir a inicio de sesión tras registrarse
});

// Ruta de dashboard (ejemplo, puede ser otra página que desees)
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { user: null }); // Cambia 'null' por la lógica de sesión si la tienes
});

app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
