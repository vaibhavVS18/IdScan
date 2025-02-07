const mongoose = require("mongoose");

// requiring data from 'data.js'
const studentData = require("./data.js");

const Student = require("../models/student.js");

const mongoURL = "mongodb://127.0.0.1:27017/justScan";
async function main() {
    await mongoose.connect(mongoURL);
  }
  main()
    .then(() => {
      console.log("connected to database justScan");
    })
    .catch((err) => {
      console.log(err);
    });

//  firstly we have to delete all data previously present in DB
const initDB = async () => {
  await Student.deleteMany({}); 
  
  studentData.data = studentData.data.map((obj) => ({
    ...obj, email: `${obj.roll_no}@iiitu.ac.in`,
  }));

  await Student.insertMany(studentData.data);
  console.log("data was initialized", studentData.data);
};

initDB();