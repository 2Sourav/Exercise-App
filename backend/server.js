require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

//middleware - can use app.use() as a middleware

app.use(express.json()); //checks if the request has any
//json body and if it does, binds it to the req object

app.use((req, res, next) => {
  //next here is a function which needs to be called, else
  //the control will not go over to the next middleware

  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and App started on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
