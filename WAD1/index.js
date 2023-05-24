import express from 'express';
import mongoose from 'mongoose';



const url = 'mongodb://127.0.0.1:27017/student';
const port = 3000;
// mongodb://127.0.0.1:27017/student
// mongodb+srv://apoorva:apoo123@cluster0.rjwflvu.mongodb.net/Cluster0?retryWrites=true&w=majority
const server = express();
server.use(express.json())

mongoose.connect(url).then( ()=> {
    console.log("MongoDB Connected");
})

const studentSchema = new mongoose.Schema({
    Name: String,
    RollNo: Number,
    WAD: Number,
    DSBDA: Number,
    CNS: Number,
    CC: Number,
    AI: Number
})

const studentData = [
    {
      Name: "Anurag",
      RollNo: 33345,
      WAD: 20,
      DSBDA: 22,
      CNS: 15,
      CC: 17,
      AI: 16
    },
    {
      Name: "Abhishek",
      RollNo: 33232,
      WAD: 13,
      DSBDA: 19,
      CNS: 10,
      CC: 14,
      AI: 23
    }
  ]

const studentModel = mongoose.model('studentmarks', studentSchema)

server.get('/', async (req, res)=> {
    try{
        res.send("Hello World!");
    }
    catch(err){
        res.send(err);
    }
})

server.get('/getStudents', async (req, res)=> {
    try{
        const totalCount = await studentModel.countDocuments();
        const students = await studentModel.find();
        const tableRows = students.map((student)=> {
            return `
            <tr>
                <td>${student.Name}</td>
                <td>${student.RollNo}</td>
                <td>${student.WAD}</td>
                <td>${student.DSBDA}</td>
                <td>${student.CNS}</td>
                <td>${student.CC}</td>
                <td>${student.AI}</td>
              </tr>`
        })

        const table = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Roll No.</th>
                    <th>WAD</th>
                    <th>DSBDA</th>
                    <th>CNS</th>
                    <th>CC</th>
                    <th>AI</th>
                    <hr>
                </tr>
            </thead>
            <tbody>
                ${tableRows.join('')}
            </tbody>
        </table>`

        res.send(`Total Count: ${totalCount} <br><br> ${table}`)
    }
    catch(err){
        res.send(err);
    }
})

server.post('/addStudents', async (req, res)=> {
    try{
        await studentModel.insertMany(studentData);
        res.send("Data Inserted");
    }
    catch(err){
        res.send(err);
    }
})

server.get('/dsbda', async (req, res)=> {
    try{
        const students = await studentModel.find({DSBDA:{$gt:20}});
        const names = students.map( (student)=> student.Name);
        res.send(`Students who got more than 20 marks in DSBDA: ${names.join(',')}`);
    }
    catch(err){
        res.send(err);
    }
})

server.put('/update', async (req, res)=> {
    const {rollno, wad, dsbda, cns, cc, ai} = req.body;
    try{
        const filter = {RollNo:rollno};
        const update = {WAD:wad, DSBDA:dsbda, CNS:cns, CC:cc, AI:ai};
        const updatedStudent = await studentModel.findOneAndUpdate(filter, update, {new:true});
        if(updatedStudent){
            res.send("Student info updated");
        }
        else{
            res.send("Student not found");
        }
    }
    catch(err){
        res.send(err);
    }
})

server.get('/gt25', async (req, res)=> {
    try{
        const students = await studentModel.find({WAD:{$gt:25}, DSBDA:{$gt:25}, CNS:{$gt:25}, CC:{$gt:25}, AI:{$gt:25}});
        const names = students.map( (student)=> student.Name);
        res.send(`Students who got more than 25 marks in all Subjects: ${names.join(',')}`)
    }
    catch(err){
        res.send(err);
    }
})

server.get('/lt40', async (req, res)=> {
    try{
        const students = await studentModel.find({WAD:{$li:40}, DSBDA:{$lt:40}});
        const names = students.map( (student)=> student.Name);
        res.send(`Students who got less than 40 marks in WAD and DSBDA: ${names.join(',')}`)
    }
    catch(err){
        res.send(err);
    }
})

server.delete('/delete/:rollno', async (req, res)=> {
    try{
        const rollno = req.params.rollno;
        const deleteStudent = await studentModel.deleteOne({RollNo : rollno});
        if(deleteStudent){
            res.send("Student Deleted");
        }
        else{
            res.send("Student not Found");
        }
    }
    catch(err){
        res.send(err);
    }
})

server.listen(port, ()=> {
    console.log("Server Connected");
})