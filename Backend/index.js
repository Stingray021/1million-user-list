require("dotenv").config()
const express = require('express');
const cors = require('cors')
const router = require('./routes/index')
const app = express();
const PORT = process.env.PORT


app.use(cors())
app.use(express.json())
app.use('/api', router)


const users = []
for (let i = 0; i < 1000000; i++)
{
    users.push({id: i, name: `Пользователь ${i+1}`, department: Math.random().toString(36).slice(2), company: Math.random().toString(36).slice(2), jobTitle: Math.random().toString(36).slice(2)})
}

const getUsers = () => users

const start = async () => {
    try {
        // await client.connect();
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start();

module.exports.users = getUsers;