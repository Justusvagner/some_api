const express = require('express');
const db = require("./db/models");

const app = express();
const { mainRoute } = require("./routes");

db.sequelize.sync({alter:true}).then(() => {
    console.log("Sequelize is running");
});

app.use("/", mainRoute);

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
