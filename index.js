const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose')
const menu=require('./rotes')
require('dotenv').config()
const app = express();
const port = 3010;


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/api',menu)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const connectDB=async ()=>{
    mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl:true
    })
    .then((data)=>console.log('Database is connected'))
    .catch((err)=>console.log('Database is not connected',err.message))
}

connectDB()