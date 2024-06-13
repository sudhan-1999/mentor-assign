import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import *  as dotenv from 'dotenv';
import { asssigning, changementor, creatementor, createstudent, mentor, particularmentor, previousmentor, student } from './mongo.js';

dotenv.config();

const app = express()
const port = 8000;
app.use(express.json());

const MONGO = process.env.mongo;


async function creatingconnection(){
    const client = new MongoClient(MONGO);
    await client.connect();
    console.log("mogodb connected")
    return client
}
export const client = await creatingconnection();
const router = express.Router();


app.use("/",router)
app.use("/student",router)
app.use("/creatementor",router)
app.use("/cretaestudent",router)
app.use("/assignmentor",router)
app.use("/chagementor",router)
// app.use("/particularmentor",router)
app.use("/previousmentor",router)


router.get("/",async (req,res)=>{
    try{
        const result = await mentor();
        res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})

router.get("/student", async (req,res)=>{
    try{
        const result = await student();
        res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})

//1)create mentor
//example
/*{
    "MentorName":""
}*/

router.post("/creatementor",async(req,res)=>{
    try{
    const {MentorName}=req.body;
    console.log(MentorName,req.body)
    await creatementor(MentorName);
    res.send("Mentor created successful")
    }catch(err){
        console.log(err)
        res.status(500).send(err.message);
    }
});

//2)create student
//example
/*{
    "StudentName":"sudhan"
}*/
router.post("/cretaestudent",async(req,res)=>{
    try{
        const {StudentName}=req.body;
        console.log(StudentName,req.body)
        await createstudent(StudentName)
        res.send("Student created successfully")
    }catch(err){
        console.log(err);
        res.status(500).send(err.message)
    }
})

//3)assigning mentor
//example
/*{    
    "studentid": "666538cfa649d32c8b4760c5",
    "MentorId": "666538aea649d32c8b4733bc",
    "MentorName": "Rajesh"
}*/
router.post("/assignmentor",async(req,res)=>{
    const {studentid,MentorId,MentorName}=req.body;
    console.log(studentid,MentorId,MentorName);
    if(!studentid||!MentorId||!MentorName){
         return res.status(400).send("missing requird fields")
    }
 
    try{
        const studentsid = studentid.map(id=>new ObjectId(id));
        const result = await asssigning(studentsid,MentorId,MentorName);
        res.send(result)
        if(result.matchedCount === 0){
            console.log("NO document found with th provided id")
        }else{
            console.log("Document updates successfully")
        }

    }catch(err){
        console.log(err)
        res.status(500).send(err.message);
    }
})

//4)change mentor
//example
/*{    
    "studentid": "666538cfa649d32c8b4760c5",
    "MentorId": "666538aea649d32c8b4733bc",
    "MentorName": "Rajesh"
}*/
router.post("/chagementor",async(req,res)=>{
    const {studentid,MentorId,MentorName}=req.body;
    const studentsid = new ObjectId(studentid);
    try{
        const result = await changementor(studentsid,MentorId,MentorName);
        result ? res.send("Mentor changed successfully"):res.send("Student not found");
    }catch(err){
        res.status(500).send(err.message);
    }
})

//5)all students for particular mentor
/*router.get("/particularmentor",async(req,res)=>{
    const {MentorId}=req.body;
    try{
        if (!ObjectId.isValid(MentorId)) {
            return res.status(400).json({ error: "Invalid student ID format" });
          }
          const MentorsId = new ObjectId(MentorId)

        if(!MentorsId){
            res.status(500).send("Missing MentorId");
        }
      const result = await  particularmentor(MentorsId);
      console.log(result);
      if (!result || result.length === 0) {
        return res.status(404).json({ error: "No students found for the given mentor" });
      }
      res.send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
})*/

//6)previously assigned mentor for perticular student
router.get("/previousmentor",async(req,res)=>{
    const{studentid}=req.body;
    try{
        if (!ObjectId.isValid(studentid)) {
            return res.status(400).json({ error: "Invalid student ID format" });
          }
          const studentsid = new ObjectId(studentid)

        if(!studentsid){
            res.status(500).send("Missing MentorId");
        }
        const result = await previousmentor(studentsid);
        const data = {"PreviuosMentorId": result.MentorId,
    "PrviousMentorName":result.MentorName }
        res.send(data);
    }catch(err){
        res.status(500).send(err.message);
    }
})
  
  



app.listen(port,()=>{console.log(`App started at ${port}`)})

