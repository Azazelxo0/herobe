const mongoose = require('mongoose')
const connectionstring = process.env.DATABASE;
mongoose.connect(connectionstring).then((res)=>{
    console.log('Connected');
    
}).catch((err)=>{
    console.log('mongoose failed',err);
    
})