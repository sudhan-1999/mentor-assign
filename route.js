/*import express from 'express';
import { creatementor, createstudent, mentor, student } from './mongo.js';

const router = express.Router();



router.get("/mentor",async(req,res)=>{
    try{
    const result = await mentor();
    console.log(result)
    res.send(result);
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
})

router.get("/student",async(req,res)=>{
    try{
        const result  = await student();
        res.send(result);
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
})

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

router.post("/cretaestudent",async(req,res)=>{
    try{
        const {studentname}=req.body;
        console.log(studentname,req.body)
        await createstudent(studentname)
        res.send("Student created successfully")
    }catch(err){
        console.log(err);
        res.status(500).send(err.message)
    }
})

*/

//const userrouter = router ;
export default router;





/*[{
    "MentorName":"Rajesh"
},
{
    "MentorName":"Kumar"
},
{
    "MentorName":"Dinesh"
},
{
    "MentorName":"Raghul"
}
]
[{
    "StudentName":"Dinesh"
},
{
    "StudentName":"Raghul"
},
{
    "StudentName":"Rakesh"
},
{
    "StudentName":"Dhinsh"
},
{
    "StudentName":"Rathesh"
}]
*/