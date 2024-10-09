const authRouter = require('express').Router();
const { register, login } = require('../Controller/authController')
const verifyToken = require('../middleware/AuthVerify')
const { createBlog } = require('../Controller/blogController')

//Authentication Routes
authRouter.post('/api/v1/user-register', register)
authRouter.post('/api/v1/login', login)

//Blog Routes
authRouter.get('/api/v2/myblog/create-blog', verifyToken, createBlog)


module.exports = authRouter;