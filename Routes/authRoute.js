const authRouter = require('express').Router();
const { register, login } = require('../Controller/authController')
const verifyToken = require('../middleware/AuthVerify')
const { createBlog, updateBlog, deleteBlog, allBlogs, userBlog, getBlogById } = require('../Controller/blogController')

//Authentication Routes
authRouter.post('/api/v1/user-register', register)
authRouter.post('/api/v1/login', login)

//Blog Routes
authRouter.post('/api/v2/myblog/create-blog', verifyToken, createBlog)
authRouter.put('/api/v2/myblog/update-blog/:id', verifyToken, updateBlog)
authRouter.delete('/api/v2/myblog/delete-blog/:id', verifyToken, deleteBlog)
authRouter.get('/api/v2/myblog/get-all-blogs', verifyToken, allBlogs)
authRouter.get('/api/v2/myblog/all-blogs', verifyToken, userBlog)
authRouter.get('/api/v2/myblog/:id', verifyToken, getBlogById)



module.exports = authRouter;