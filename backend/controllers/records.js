const Record = require("../models/record.js")
const url = "http://knn:3000/predict?"
const axios = require('axios')
module.exports.index = async (req, res) => {
  const allRecords = await Record.find({});
  res.render("records/index.ejs", { allRecords });
}

module.exports.renderNewForm = (req, res) => {
  res.render("records/new.ejs");
}

module.exports.showRecord = async (req, res) => {
  let { id } = req.params;
  const record = await Record.findById(id).populate("owner");
  res.render("records/show.ejs", { record });
}

module.exports.createRecord = async (req, res, next) => {
  try {
    const newRecord = new Record(req.body.record);
    const { age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc } = req.body.record;

    // Log request details for debugging
    console.log('Request Body:', req.body.record);

    const requestUrl = `${url}age=${age}&gender=${gender}&height=${height}&weight=${weight}&ap_hi=${ap_hi}&ap_lo=${ap_lo}&cholesterol=${cholesterol}&gluc=${gluc}`;
    console.log('Request URL:', requestUrl);

    const response = await axios.get(requestUrl);
    console.log('Response Data:', response.data);

    newRecord.prediction = response.data.prediction;
    newRecord.owner = req.user;
    await newRecord.save();

    req.flash("success", "New Record Created!");
    res.redirect("/records/");
  } catch (error) {
    console.error('Error creating record:', error);
    req.flash("error", "Failed to create record");
    res.redirect("/records/new");
  }
}


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const record = await Record.findById(id);
  res.render("records/edit.ejs", { record });
}

module.exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body.record;

    // Log request details for debugging
    console.log('Request Body:', body);

    const requestUrl = `${url}age=${body.age}&gender=${body.gender}&height=${body.height}&weight=${body.weight}&ap_hi=${body.ap_hi}&ap_lo=${body.ap_lo}&cholesterol=${body.cholesterol}&gluc=${body.gluc}`;
    console.log('Request URL:', requestUrl);

    const response = await axios.get(requestUrl);
    console.log('Response Data:', response.data);

    body.prediction = response.data.prediction;
    const record = await Record.findByIdAndUpdate(id, { ...body });

    req.flash("success", "Record Updated!");
    res.redirect(`/records/${id}`);
  } catch (error) {
    console.error('Error updating record:', error);
    req.flash("error", "Failed to update record");
    res.redirect(`/records/${id}/edit`);
  }
}

module.exports.deleteRecord = async (req, res) => {
  let { id } = req.params;
  let deletedRecord = await Record.findByIdAndDelete(id);
  req.flash("success", "Record Deleted!");
  res.redirect("/records/");
}