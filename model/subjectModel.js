const mongoose = require('mongoose');
const subjectSchema = mongoose.Schema({
    subjectID: String,
    subjectName: String,
    subjectPrice: Number,
    subjectHours: Number,
    image: String
});
module.exports = mongoose.model('dbSubject', subjectSchema);