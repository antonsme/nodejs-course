const mongoose = require("mongoose")
const Schema = mongoose.Schema


const facultySchema = new Schema({
    faculty: {
        type: String,
        required: true
    },

    faculty_name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Faculty = mongoose.model("Faculty", facultySchema, "faculty")

module.exports = Faculty