const mongoose = require('mongoose')
const env = require('dotenv')

env.config();

const db = async() => {
    try {
        const CONNECTION_URL = process.env.DATABASE_URL;
        await mongoose.connect(CONNECTION_URL).then((data) => {
            console.log('DATABASE CONNECTED ...!!')
        }, (err) => {
            console.log('Connection failed ...!!')
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = db();