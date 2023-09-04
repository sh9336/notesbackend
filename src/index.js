const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Note=require('./models/Note');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(
   "mongodb+srv://saurabh25k:notes1234@cluster0.qzr4q4a.mongodb.net/notesdb"
).then(function(){
    app.get('/',function(req,res){
        const response = {message:"API works!"};
        res.json(response);
    });
    app.post('/notes/list',async function(req,res){
        var notes =await Note.find({userid:req.body.userid});
        res.json(notes);
    });
    app.post('/notes/add',async function(req,res){

        //for Update
        await Note.deleteOne({id:req.body.id});


        const newNote = Note(
            {
                id:req.body.id,
                userid:req.body.userid,
                title:req.body.title,
                content:req.body.content
            }
        );
        await newNote.save(); 
        const response={message:"New Note Created!"+`id: ${req.body.id}`}; 
        res.json(response);
    });
    app.post("/notes/delete",async function(req,res){
        await Note.deleteOne({id:req.body.id});
        const response={message:"Note Delted!"+`id: ${req.body.id}`}; 
        res.json(response);
    });
});

const port = process.env.PORT || 5000; 
app.listen(port,()=>{console.log("Listening on port 5000")});

