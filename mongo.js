import { client } from "./index.js";

export async function mentor() {
  try {
    return await client
      .db("mentorassigning")
      .collection("mentor")
      .find()
      .toArray();
  } catch (err) {
    throw err;
  }
}
export async function student() {
  try {
    return await client
      .db("mentorassigning")
      .collection("students")
      .find({ $or: [{ MentorId: { $exists: false } }, { MentorId: null }] })
      .toArray();
  } catch (err) {
    throw err;
  }
}

export async function creatementor(MentorName) {
  try {
    const result = await client
      .db("mentorassigning")
      .collection("mentor")
      .insertOne({ MentorName: MentorName });
    return result;
  } catch (err) {
    throw err;
  }
}
export async function createstudent(StudentName) {
  try {
    const result = await client
      .db("mentorassigning")
      .collection("students")
      .insertOne({ studentName: StudentName });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function particularmentor(MentorsId) {
  try {
    return await client
      .db("mentorassigning")
      .collection("students")
      .find({
        $or: [
          { MentorId: MentorsId },
          { Newmentorid: MentorsId }
        ]
      })
      .toArray();
  } catch (err) {
    throw err;
  }
}

export async function asssigning(studentsid,MentorId,MentorName) {
  try {
   return await client
      .db("mentorassigning")
      .collection("students")
      .updateMany(
        { _id:  { $in: studentsid } },
        { $set: { MentorId: MentorId ,MentorName:MentorName} }
      ); 
  } catch (err) {
    throw err;
  }
}

export async function changementor(studentsid,MentorId,MentorName){
  try{
    return await client.db("mentorassigning").collection("students").updateOne({_id:studentsid},{$set:{Newmentorid:MentorId,NewmentorName:MentorName}})
  }catch(err){
    throw err;
  }
}

export async function previousmentor(studentsid){
  try{
    return await client.db("mentorassigning").collection("students").findOne({_id:studentsid});
  }catch(err){
    throw err;
  }
}