const express = require('express');
const path = require('path');
const fs = require('fs');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts', // Ruta de layouts
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Página de inicio
app.get('/', (req, res) => {
    res.render('index', { title: 'SkatePark', message: 'Bienvenido al SkatePark' });
});

// Página de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista login.hbs
});

app.get('/signup', (req, res) => {
    res.render('signup'); // Renderiza la vista de registro
});


// Procesar el formulario de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        console.log(`Inicio de sesión exitoso: Usuario: ${username}`);
        res.redirect('/dashboard');
    } else {
        console.log('Credenciales inválidas');
        res.redirect('/login');
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Aquí puedes agregar la lógica para guardar el usuario en tu base de datos
    console.log(`Nombre: ${name}, Email: ${email}`);

    // Redirigir a otra página después del registro exitoso
    res.redirect('/login');
});


// Dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Panel de Control' });
});

// Participantes JSON
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

// Mostrar los participantes
app.get('/participants', (req, res) => {
    const participants = getParticipants();
    res.render('participants', { participants });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
