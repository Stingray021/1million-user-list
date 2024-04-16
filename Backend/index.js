const express = require('express');
const ws = require("./ws.js");
const pg = require("./pg.js");
const searchfriend = require("./searchfriend.js");
const cors = require('cors')
const router = require('./routes/index')
const client = require('./db')
const app = express();
const PORT = process.env.PORT
const editmessage = require("./editmessage.js");

app.use(cors())
app.use(express.json())
app.use('/api', router)

//Путь для получения чатов пользователя по userid
app.get('/getchats', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    let userid = await req.query.userid;

    let answer = await pg.getchats(userid);

    res.send(JSON.stringify(answer));
})

//Путь для получения сообщений из БД пользователем по groupid и userid
app.get('/getchatmessages', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    let userid = await req.query.userid;

    let chatid = await req.query.chatid;

    let createdate = await req.query.createdate;

    let answer = await pg.getonechatmessages(userid, chatid, createdate);

    res.send(JSON.stringify(answer));
})

//Путь для получения найденных пользователей
app.get('/searchfriend', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    let search = req.query.search;

    let answer = await searchfriend.searchfriend(search);

    res.send(JSON.stringify(answer));
})

//Путь для изменения сообщения
app.patch('/editmessage', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let messageid = req.body.messageid;
    let newtext = req.body.newtext;

    let answer = await editmessage.editmessage(messageid, newtext);

    res.send(JSON.stringify(answer));
})

// var server = app.listen(8080, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("Сервер работает на порту 8080");
//
// });

ws.ws();
const users = []
// Array<{name: string, department: string, company: string, jobTitle: string}>.
for (let i = 0; i < 1000000; i++)
{
    users.push({id: i, name: `Пользователь ${i+1}`, department: Math.random().toString(36).slice(2), company: Math.random().toString(36).slice(2), jobTitle: Math.random().toString(36).slice(2)})
}

const getUsers = () => users
// console.log(getUsers())
const start = async () => {
    try {
        await client.connect();
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
    //await client.end();
}
start();

module.exports.users = getUsers;