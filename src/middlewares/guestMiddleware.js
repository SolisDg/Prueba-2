/**Middleware de invitado */
function guestMiddleware (req, res, next) {
    if (req.session && req.session.userLogged){
        return res.redirect('/users/profile');
    }
    return next();
}
module.exports = guestMiddleware;