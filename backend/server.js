require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const db =require("./config/config");


app.use(express.json())
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

app.use('/participant', require('./routes/participant'))
app.use('/admin', require('./routes/admin'))
app.use('/question', require('./routes/question'))
app.use('/group', require('./routes/group_members'))
app.use('/questionToken', require('./routes/question_token'))


app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})