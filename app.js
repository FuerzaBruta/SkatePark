const express = require('express');
const path = require('path');
const fs = require('fs');
const { engine } = require('express-handlebars');

// Inicialización
const app = express();
const PORT = 3000;

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// RUTAS

// Página principal
app.get('/', (req, res) => {
    res.render('index', { title: 'SkatePark', message: 'Bienvenido al SkatePark' });
});

// Página de inicio de sesión
app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@email.com' && password === '1234') {
        console.log('Inicio de sesión exitoso');
        res.redirect('/dashboard');
    } else {
        console.log('Credenciales inválidas');
        res.redirect('/login');
    }
});

// Página de registro
app.get('/register', (req, res) => res.render('register'));

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Registro: Nombre: ${name}, Email: ${email}`);
    res.redirect('/login'); // Redirigir al login tras el registro
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Panel de Control', user: null });
});

// Mostrar participantes desde un archivo JSON
const filePath = path.join(__dirname, 'participants.json');

const getParticipants = () => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return [];
    }
};

app.get('/participants', (req, res) => {
    const participants = getParticipants();
    res.render('participants', { participants });
});

// Rutas de error 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
