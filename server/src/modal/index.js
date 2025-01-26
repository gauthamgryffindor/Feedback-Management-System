import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const db=mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORTNO,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DB
})
db.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("database connected")
})
export default db;