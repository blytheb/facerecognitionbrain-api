const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'blythe',
//         password: '',
//         database: 'smart-brain'
//     }
// });

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
});

const app = express();

app.use(express.json());
app.use(cors())

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=>{
    console.log('app is running');
})
