const UserModel = require('../Model/UserModel')
const BlogModel = require('../Model/BlogModel')

exports.createBlog = async (req, res) => {

    try {
        const { user, email } = req.user;
        const { title, body, tags } = req.body;

        if (!title || !body || !tags) {
            return res.status(400).send({
                success: false,
                message: "Please enter all required fields."
            })
        }

        const userList = await UserModel.findOne({ email })

        if (userList) {
            const blogList = new BlogModel({ title: title, body: body, tags: tags, user: userList })
            await blogList.save().then(() => res.status(200).json({ blogList }));
            userList.blog.push(blogList);
            userList.save();
            return res.status(200).send({
                success: false,
                message: "Blog created successfully."
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "user not verify",
            })
        }

    } catch (error) {
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.message // Send the error message from Mongoose
            });
        }

        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { title, body } = req.body;
        const { email } = req.user;
        const id = req.params.id;
        console.log(id, 'id')
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Blog id is required."
            })
        }

        if (title === '' || body === '') {
            return res.status(400).send({
                success: false,
                message: "Please enter all required field."
            })
        }

        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            const blogLIst = await BlogModel.findByIdAndUpdate(id, { title: title, body: body })
            blogLIst.save().then(() => {
                return res.status(200).send({
                    success: true,
                    message: "Successfully updated."
                })
            }, (error) => {
                return res.status(400).send({
                    success: false,
                    message: "Something went wrong with upldate api."
                })
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { id, email } = req.user;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found."
            })
        }

        const isBlogExist = user.blog.indexOf(blogId);

        if (isBlogExist === -1) {
            return res.status(404).send({
                success: false,
                message: "Blog not found."
            })
        }

        const userList = await UserModel.findOneAndUpdate({ email }, { $pull: { blog: blogId } })

        if (userList) {
            await BlogModel.findByIdAndDelete(blogId).then(() => {
                return res.status(200).send({
                    success: true,
                    message: "Blog deleted successfully."
                })
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
}

exports.allBlogs = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not verified."
            })
        }
        // const allBlogs = await BlogModel.find({});
        const allBlogs = await BlogModel.find({}).populate('user', 'name');

        res.status(200).send({
            success: true,
            data: allBlogs,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

exports.userBlog = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await UserModel.findOne({ email }).populate('blog', 'title body');

        const {email: userEmail, password, ...other} = user._doc;

        res.status(200).send({
            success: true,
            data: other
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }

}

exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        
        const blog = await BlogModel.findOne({_id: id}).populate('user', 'name');

       if(!blog){
        return res.status(400).send({
            success: false, 
            message: "Blog not found."
        })
       }

       res.status(200).send({
        success: true,
        data: blog
       })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });       
    }
}