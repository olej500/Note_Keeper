require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const app = express()
 
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/src"))
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
    .then(function () {
        app.listen(process.env.NODE_PORT, function (req, res) {
            console.log("server is up and running at port: " + process.env.NODE_PORT)
        })
    })

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    content: {
        type: String,
        required : true
    }
  })
  const Note = mongoose.model("Note", noteSchema);

app.route("/api")
    .get(async function (req, res) {
        console.log("rendering index.html")
        const notes = await Note.find({})
        res.status(200).json(notes)
    })
    .post(async function (req, res){
        const {title, content} = req.body
        try{
            const note = await Note.create({title, content})
            res.status(200).json(note)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    })
app.delete("/api/:id", async function (req, res){
    try{
        const note = await Note.findByIdAndDelete({_id: req.params.id})
        res.status(200).json(note)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})