const Record = require("../models/record.js")
const { predict } = require('../knn.js')

module.exports.index=async (req, res) => {
  const allRecords = await Record.find({});
  res.render("records/index.ejs", { allRecords  });
}

module.exports.renderNewForm = (req, res) => {
    res.render("records/new.ejs");
  }

module.exports.showRecord=async (req, res) => {
    let { id } = req.params;
    const record = await Record.findById(id).populate("owner");
    res.render("records/show.ejs", { record });
  }

module.exports.createRecord = async (req, res, next) => {
    const newRecord = new Record(req.body.record);
    let body = req.body;
    
    newRecord.prediction = await predict(body.age,body.gender,body.height,body.weight,body.ap_hi,body.ap_lo,body.cholesterol,body.gluc);
    newRecord.owner = req.user;
  
    await newRecord.save();
    req.flash("success", "New Record Created!");
    res.redirect("/records/");
  }


module.exports.renderEditForm= async (req, res) => {
    let { id } = req.params;
    const record = await Record.findById(id);
    res.render("records/edit.ejs", {record});
  }

  module.exports.updateRecord = async (req, res) => {
    let { id } = req.params;
    let body = req.body.record;
    body.prediction = await predict(body.age,body.gender,body.height,body.weight,body.ap_hi,body.ap_lo,body.cholesterol,body.gluc);
    let record =  await Record.findByIdAndUpdate(id, { ...body });

    req.flash("success", "Record Updated!");
    res.redirect(`/records/${id}`);
  }

  module.exports.deleteRecord = async (req, res) => {
    let { id } = req.params;
    let deletedRecord = await Record.findByIdAndDelete(id);
    req.flash("success", "Record Deleted!");
    res.redirect("/records/");
  }