import mongoose from "mongoose";

const url = 'mongodb://127.0.0.1:27017/proyecto-final' //BD-LOCAL
// const url = 'mongodb+srv://TomasBudeguer:KJI5kQLnLz619pLl@cluster0.vjacqdu.mongodb.net/proyecto-final' //BD-GLOBAL

mongoose.connect(url)

const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('BD conectada')
})