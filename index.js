/**Importing local environment variables */
require("dotenv").config();

/**Importing other required dependencies */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

/**Setting port variable */
const port = process.env.PORT || 5000;

/**Adding express Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Adding cors to open for all end points */
app.use(cors());

/**Adding Route end points */
app.use("/", require("./Routes/routes"));

/**Starting the server and making it listen to a port */
app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  await mongoose.connect(process.env.DBURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database Connected!");
});

