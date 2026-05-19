//Servidor principal de Pretty Thermo


const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const cors = require ('cors');

require('dotenv').config();

const app = express();


const PORT = process.env.PORT || 3300;

app.use(cors({
    // Origen React
    origin: 'http://localhost:3001',
    // Métodos HTTP permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Permitir envío de cookies (si usas autenticación)
    credentials: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
//Para parsear datos de formularios:
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(session({
    secret: 'prettythermo_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 72,
        httpOnly: true,
        secure: false //true en produccion con https
    }
}));

app.use((req, res, next) => {
    res.locals.userSession = req.session.userLogged || null;
    next();
});

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//Rutas de vistas EJS
const mainRoutes = require('./src/routes/main');
const productsRoutes = require('./src/routes/products');
const userRoutes = require('./src/routes/users');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', userRoutes);

//Rutas de API
const apiProductsRoutes = require('./src/routes/api/products');
const apiUsersRoutes = require('./src/routes/api/users');
const apiCategoriesRoutes = require('./src/routes/api/categories');

app.use('/api/products', apiProductsRoutes);
app.use('/api/users', apiUsersRoutes);
app.use('/api/categories', apiCategoriesRoutes);

app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - No Encontrado',
        message: 'Página no encontrada' 
    });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3300`);
    console.log(`¡Pretty Thermo está listo!`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
});

setInterval(() => {}, 1000);


