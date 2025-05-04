const express = require('express') 
const dotenv = require ("dotenv");
const cors = require("cors");
const colors = require("colors");

const database = require('./utils/db.js')
const authRoutes  = require("./routes/admin.js")
const creditRoutes = require("./routes/credits.js")
const profileUpdate = require("./routes/auth.js")


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.connect();

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileUpdate);
app.use('/api/credits', creditRoutes);


app.get('/',(req,res)=> {
    res.send('Welcom to VertxAI...');
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`.green.underline.bold);
});