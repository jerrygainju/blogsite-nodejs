//find the required data parsed from the body inputed from above
const Post = require('../database/models/Post') 

module.exports = async (req, res) => {
    const posts = await Post.find({});
    res.render('index', {
        posts
    });
}