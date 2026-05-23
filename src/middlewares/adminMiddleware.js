/**Middleware del administrador */
function adminMiddleware(req, res, next) {
    if(req.session.userLogged && req.session.userLogged.role === 'admin') {
        return next();
    }
    
    // Si la ruta pertenece a la API, retornamos un JSON
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(403).json({
            status: 'error',
            message: 'No tiene permisos para realizar esta acción'
        });
    }

    return res.status(403).render('error', {
        message: 'No tiene permisos para acceder a esta sección...'
    });
}
module.exports = adminMiddleware;