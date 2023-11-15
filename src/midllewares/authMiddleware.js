//checkea si el usuario esta logueado

function authtMiddleware(req, res, next) { 
    if (req.session.usuarioLogueado != undefined) {
        next();
    } else {
        res.send("Esta página es solo para usuarios");
    }
}

module.exports = authtMiddleware;