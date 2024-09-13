import express from "express";
import  dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data
app.use("/api/user", UserRoutes);


// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

var mongoURL = 'mongodb+srv://dinukgunasekara286:Bzt3SrJYtm5htN4H@fitnessdb.w1xusgy.mongodb.net/'

const connectDB = () => {
   mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL|| mongoURL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8002, () => console.log("Server started on port 8002"));

  } catch (error) {
    console.log(error);
  }
};
startServer();
