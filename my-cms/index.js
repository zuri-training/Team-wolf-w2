const express = require('express')
const connect = require ('./config/database')

connect()


const app = express()



const PORT = process.env.PORT|| 3000;

app.get('/', 
(req ,res)=> {res.send('my cms');
});

app.listen(PORT, () => console.log(`serving on port ${PORT}`));
