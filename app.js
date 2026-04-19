//Servidor principal de Pretty Thermo


const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3300;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'prettythermo_secret_key_2026',
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


const mainRoutes = require('./src/routes/main');
const productsRoutes = require('./src/routes/products');
const userRoutes = require('./src/routes/users');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', userRoutes);

app.use((req, res) => {
    res.status(404).render('404', { message: 'Página no encontrada' });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3300`);
    console.log(`¡Pretty Thermo está listo!`);
});

