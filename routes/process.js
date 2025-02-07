
// npm install multer axios cors form-data dotenv
if(process.env.NODE_ENV != "production"){
    require("dotenv").config(); 
  }

const express = require("express");
const router = express.Router();

const upload = require("../multerConfig.js");

const wrapAsync = require("../utils/wrapAsync.js");
const Tesseract = require('tesseract.js');

const Student = require("../models/student.js");
const Entry = require("../models/entry.js");
const Temp = require("../models/temp.js");

const { ensureAuthenticated, isOwner, isGuard} = require('../middleware.js');
const say = require("say");
//........................................................
router.route("/extract-text")
    .post(upload.single('image'),ensureAuthenticated, (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        } 
      
        // Convert Buffer to a usable format for Tesseract
        Tesseract.recognize(req.file.buffer, 'eng')
            .then(({ data: { text } }) => {
                res.json({ extractedText: text });
            })
            .catch(error => res.status(500).json({ error: error.message }));
      });


    router.post('/upload', ensureAuthenticated, upload.single('image'), wrapAsync(async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('No image uploaded');
            }
    
            // Process the image using Tesseract.js
            const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng', {
              logger: (m) => {
                  if (m.status === 'done') console.log("OCR Completed!");
              }
            });
            let extractedText =text;
          
            // Extract roll number from OCR result
            let lines = extractedText.split('\n');
            function splitWords(textArray) {
              return textArray
                  .map(line => line.split(/\s+/)) // Split each line by spaces
                  .flat() // Flatten the array
                  .filter(word => word.trim() !== ''); // Remove empty strings
            }
            lines = splitWords(lines);
            console.log(lines);
            function contains(arr, searchItems) {
                return searchItems.some(item => arr.includes(item));
            }
            const searchItems = [process.env.FIRST, process.env.SECOND, process.env.THIRD, process.env.FOURTH,process.env.FIFTH,process.env.SIXTH,process.env.SEVEN,process.env.EIGHT,process.env.NINE,process.env.TEN,process.env.ELEVEN];
            
            const output = lines.find(line => line.length === 5 && line.startsWith('2') && !isNaN(line));
            console.log(output);
            if (output) {
                if(contains(lines,searchItems)){
                    return res.send('Success: Roll No found: ' + output);
                }
            } else {
                return res.status(404).send('Roll No not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error: ' + error.message);
        }
    }));


router.route("/camera")
    .get(ensureAuthenticated, wrapAsync(async (req,res)=>{
        let todayDate = new Intl.DateTimeFormat('en-GB').format(new Date());
        let entries = await Entry.find({Leaving_date: todayDate}).populate("student");
        // console.log(entries);
        // req.flash("success", "done");
        res.render("camera.ejs",{entries});
    }))
    .put( ensureAuthenticated, wrapAsync(async(req,res)=>{
        let {roll_no} = req.body;
        let st = await Student.findOne({roll_no: roll_no});
        if(!st)  return res.status(404).json({ error: "Student not found" });
    
        if (res.locals.currUser == process.env.GUARD || res.locals.currUser == process.env.OWNER) {
            // -> check if this entry already present
            let existingEntry = await Entry.findOne({student: st._id, Arrival_time: null});
            if(existingEntry){
                // await Entry.deleteOne({student:st._id});
                const time = new Date().toLocaleTimeString('en-GB').slice(0,5);
                const date = new Intl.DateTimeFormat('en-GB').format(new Date());
                let updated_entry = await Entry.findOneAndUpdate(existingEntry,{Arrival_time: time, Arrival_date: date}, {new:true}).populate("student");
                
                say.speak(`${updated_entry.student.name},your entry is closed.`, 'Samantha', 1.0);
                req.flash("entry", JSON.stringify(updated_entry));
                return res.send({message: "Entry already exists"});
            } 
        
            if(! req.body.destination){
            return res.status(400).json({ requireDestination: true });
            }
            
            let newEntry = new Entry({
                student: st._id,
                destination: req.body.destination
            });
            await newEntry.save();
        
            let entry = await Entry.findOne(newEntry).populate("student");
            say.speak(`${entry.student.name},your entry is done.`, 'Samantha', 1.0);
            req.flash("entry", JSON.stringify(entry));
            // res.redirect("/camera"); 
            res.send(entry);
        }
        else{
            // -> check if this entry already present
            let existingEntry = await Temp.findOne({student: st._id, Arrival_time: null});
            if(existingEntry){
                const time = new Date().toLocaleTimeString('en-GB').slice(0,5);
                const date = new Intl.DateTimeFormat('en-GB').format(new Date());
                let updated_entry = await Temp.findOneAndUpdate(existingEntry,{Arrival_time: time, Arrival_date: date}, {new:true}).populate("student");
                
                say.speak(`${updated_entry.student.name},your entry is closed.`, 'Samantha', 1.0);
                req.flash("entry", JSON.stringify(updated_entry));
                return res.send({message: "Entry already exists"});
            } 
        
            if(! req.body.destination){
            return res.status(400).json({ requireDestination: true });
            }
            
            let newEntry = new Temp({
                student: st._id,
                destination: req.body.destination
            });
            await newEntry.save();
        
            let entry = await Temp.findOne(newEntry).populate("student");
            say.speak(`${entry.student.name},your entry is done.`, 'Samantha', 1.0);
            req.flash("entry", JSON.stringify(entry));
            // res.redirect("/camera"); 
            res.send(entry);
        }
    }));

module.exports = router;