const router = require('./Router/router')

require('dotenv').config()
const express = require('express')
require('./DB/connection')
const cors = require('cors')
const hserver = express()
hserver.use(cors())
hserver.use(express.json())
hserver.use(router)

const PORT = 4000;

hserver.listen(PORT,()=>{
    console.log('hserver is running in port',PORT);
    
})

hserver.get('/',(req,res)=>{
    res.send('server for hero')
})