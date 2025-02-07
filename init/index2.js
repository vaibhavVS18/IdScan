const mongoose = require("mongoose");

// requiring data from 'data.js'
const entryData = require("./data.js");

const Entry = require("../models/entry.js");

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
  await Entry.deleteMany({}); 
  
  await Entry.insertMany(entryData.data2);
  console.log("data was initialized", entryData.data2);
};

initDB();