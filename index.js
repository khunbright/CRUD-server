import express  from "express";
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"photodb"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/photos",(req,res)=>{
    const q = "SELECT * FROM photo"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/photos", (req,res)=>{
    const q = "INSERT INTO photo (`title`,`photo`) VALUE (?)"
    const values = [
        req.body.title,
        req.body.photo
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Hi bright")
    })
})

app.delete("/photos/:id",(req,res)=>{
    const photoID = req.params.id;
    const q = "DELETE FROM photo WHERE id = ?"

    db.query(q,[photoID], (err,data)=>{
        if(err) return res.json(err)
        return res.json("delete success")
    })
})

app.put("/photos/:id",(req,res)=>{
    const photoID = req.params.id;
    const q = "UPDATE photo SET `title` = ?,`photo` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.photo
    ]

    db.query(q,[...values,photoID], (err,data)=>{
        if(err) return res.json(err)
        return res.json("update success")
    })
})

app.listen(8800, ()=>{
    console.log("Connect to backend")
})