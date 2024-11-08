const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Faculty = require("./models/faculty")
const Pulpit = require("./models/pulpit")
const { error } = require("console")
const { ObjectId } = require('mongoose').Types;


const app = express()

app.use(express.json());

const PORT = 3000

const db = "mongodb+srv://antonsmelkv:qN1l6lOd8K3jiBxn@cluster0.ymy7q.mongodb.net/BSTU?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected by db"))
    .catch((error) => console.log(error))

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}...`)
})

app.get("/", (req, res) => {
    res.send("<h1>main</h1>")
})

// get all
app.get("/faculties", async (req, res) => {
    try {
        const faculties = await Faculty.find()
        console.log(faculties)
        res.json(faculties)
    } catch (error) {
        res.send(error)
    }
})
app.get("/pulpits", async (req, res) => {
    try {
        const fArr = req.query.f
        if (fArr) {
            const fStr = fArr.split(",").map(item => item.trim())
            console.log(fStr)
            const pulpits = await Pulpit.find()
            const filteredPulpits = pulpits.filter((p, index) => p.id == fStr[index])
            res.json(filteredPulpits)
        }
        else {
            const pulpits = await Pulpit.find()
            res.json(pulpits)
        }
    } catch (error) {
        res.send(error)
    }
})
// get one
app.get("/faculties/:xyz", async (req, res) => {
    try {
        const xyz = req.params.xyz
        const faculties = await Faculty.find()
        const faculty = faculties.find(f => f.id == xyz)
        if (faculty)
            res.json(faculty)
        else res.json({ error: "not found this faculty" })
    } catch (error) {
        res.json({ error: error })
    }
})
app.get("/pulpits/:xyz", async (req, res) => {
    try {
        const xyz = req.params.xyz
        const pulpits = await Pulpit.find()
        const pulpit = pulpits.find(p => p.id == xyz)
        if (pulpit)
            res.json(pulpit)
        else res.json({ error: "not found this pulpit" })
    } catch (error) {
        res.json({ error: error })
    }
})
//add one
app.post("/faculties", (req, res) => {
    const { faculty, faculty_name } = req.body
    const newFaculty = new Faculty({ faculty, faculty_name })
    newFaculty
        .save()
        .then((result) => {
            console.log(result)
            res.status(201).json(result);
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
})

app.post("/pulpits", (req, res) => {
    const { pulpit, pulpit_name, faculty } = req.body
    const newPulpit = new Pulpit({ pulpit, pulpit_name, faculty })
    newPulpit
        .save()
        .then((result) => {
            console.log(result)
            res.status(201).json(result);
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
})
//delete one
app.delete("/faculties/:xyz", async (req, res) => {
    try {
        const xyz = req.params.xyz
        const objectId = new ObjectId(xyz)
        const deletedFaculty = await Faculty.findOneAndDelete({ _id: objectId })
        if (deletedFaculty) {
            res.json({ message: "Faculty deleted successfully", faculty: deletedFaculty })
        } else {
            res.status(404).json({ error: "Not found this pulpit" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.delete("/pulpits/:xyz", async (req, res) => {
    try {
        const xyz = req.params.xyz
        const objectId = new ObjectId(xyz)
        const deletedPulpit = await Pulpit.findOneAndDelete({ _id: objectId })
        if (deletedPulpit) {
            res.json({ message: "Pulpit deleted successfully", pulpit: deletedPulpit })
        } else {
            res.status(404).json({ error: "Not found this pulpit" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});
//change one 
app.put("/faculties/:xyz", async (req, res) => {
    try {
        const xyz = req.params.xyz
        const { faculty, faculty_name } = req.body
        const objectId = new ObjectId(xyz)
        const updatedFaculty = await Faculty.updateOne({ _id: objectId }, { faculty: faculty, faculty_name: faculty_name });
        if (updatedFaculty) {
            res.json({ message: "Faculty updated successfully", faculty: updatedFaculty })
        } else {
            res.status(404).json({ error: "Not found this faculty" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.put("/pulpits/:xyz", async (req, res) => {
    try {
        const xyz = req.params.xyz
        const { pulpit, pulpit_name, faculty } = req.body
        const objectId = new ObjectId(xyz)
        const updatedPulpit = await Pulpit.updateOne({ _id: objectId }, { pulpit: pulpit, pulpit_name: pulpit_name, faculty: faculty })
        if (updatedPulpit) {
            res.json({ message: "Pulpit updated successfully", pulpit: updatedPulpit })
        } else {
            res.status(404).json({ error: "Not found this pulpit" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//tranzaction

app.post("/transaction", async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const documents =
            [{
                pulpit: "BТ",
                pulpit_name: "Военно-технологический",
                faculty: "ИУ"
            },
            {
                pulpit: "ИТ",
                pulpit_name: "инженерно-технологический",
                faculty: "ИК"
            },
            {
                pulpit: "ИнТ",
                pulpit_name: "информационно-технологический",
                faculty: "ИБ"
            }]

        const newPulpits = await Pulpit.insertMany(documents)
        if (newPulpits) {
            await session.commitTransaction()
            res.json({ message: "Pulpits added successfully", pulpit: newPulpits })
        } else {
            await session.commitTransaction()
            res.json({ error: error })
        }
    } catch (error) {
        res.json({ error: error })
    }

})









