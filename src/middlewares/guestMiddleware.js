/**Middleware de invitado */
function guestMiddleware (req, res, next) {
    if (req.session && req.session.userLogged){
        if (req.session.userLogged.role === 'admin') {
            return next();
        }
        return res.redirect('/users/profile');
    }
    return next();
}
module.exports = guestMiddleware;