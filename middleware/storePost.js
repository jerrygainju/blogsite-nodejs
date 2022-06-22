
//validate is done and will be passed on index.js to complete was-validated
//it is a middleware
module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.title || !req.body.description || !req.body.content || !req.files.image) {
        return res.redirect('/create/new')
    }

    next()
}