//create page is shown and a create form is visible
module.exports = (req, res) => {
    if(req.session.userId)
    {
    return res.render('create')
    }
}
    

