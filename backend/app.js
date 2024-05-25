const express= require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const cors=require("cors");
app.use(cors());
const userRoute=require("./routes/userRoute");

app.use(express.json());
// Debugging middleware to log requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    next();
  });
  //MongoDB Connection
mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected successfully");
    const port = process.env.PORT || 8000;
    app.listen(port, (err) => {
      if (err) console.log(err);
      console.log("running successfully at", port);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });


app.use(userRoute);

