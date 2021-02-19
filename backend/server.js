const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const db =require("./config/config");


app.use(express.json())
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

app.use('/participant', require('./routes/participant'))
app.use('/posts', require('./routes/post'))

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})