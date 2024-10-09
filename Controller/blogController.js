exports.createBlog = async(req, res) => {
    const {user, email} = req.user;
    const {title, body} = req.body;
    res.send({
        user: user,
        email: email, 
        title: title,
        body: body
    })

    console.log(title, 'tilte')
}