/**Midedleware de autenticación */
function authMiddleware(req, res, next) {
    if (req.session && req.session.userLogged) {
        return next();
    }
    return res.redirect('/users/login');
}
module.exports = authMiddleware;