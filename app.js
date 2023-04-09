const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

db.connect((error, connection) => {
    if (error) {
        throw error;
    }
    else {
        console.log("db connected successfully");
    }
});

app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));

// console.log(__dirname);
const location = path.join(__dirname, "/");
app.use(express.static(location));
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log("server started on port " + port);
});

