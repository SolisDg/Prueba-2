/**Middleware de invitado */
function guestMiddleware (req, res, next) {
    if (req.session && req.session.userLogged){
        return res.redirect('/users/perfil');
    }
    return next();
}
module.exports = guestMiddleware;