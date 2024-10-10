const { compareSync, hashSync } = require('bcrypt')
const UserModal = require('../Model/UserModel')
const { SECRET_KEY } = require('../constant/constant')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({
                success: false,
                message: "Please enter all fields."
            })
        }

        const hashPassword = hashSync(password, 10);

        const userList = new UserModal({
            name: name, email: email, password: hashPassword
        });

        const isUserAvailable = await UserModal.findOne({ email: email });

        if (isUserAvailable) {
            res.status(400).send({
                message: "User already exists.",
                success: false
            })
        }

        if (!isUserAvailable) {
            await userList.save().then((data) => {
                res.status(201).send({
                    success: true,
                    message: "User created successfully.",
                })
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Something went wrong with user create api.",
            success: false,
            error: error,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "please enter all required filed."
            })
        }

        const userAvailable = await UserModal.findOne({email: email});

        if(!userAvailable){
            return res.status(400).send({
                success: false,
                message: "Invalid email."
            })
        }

        const isPasswordCorrect = compareSync(password, userAvailable.password);

        if(!isPasswordCorrect){
            return res.status(400).send({
                success: false, 
                message: "Incorrect password."
            })
        }

        const tokenPayload = {
            user: userAvailable._id,
            email: email
        }

        const token = jwt.sign(tokenPayload, SECRET_KEY, {expiresIn: '30d'})

        res.status(200).send({
            message: "login success.",
            token: token
        })

    } catch (error) {
        console.log(error)

    }
}