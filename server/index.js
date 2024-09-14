import express from "express";
import  dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import morgan from "morgan";


dotenv.config();

const app = express();
// CORS configuration
const corsOptions = {
  origin: "https://fitness-track-frontend-using-mern.vercel.app", // Frontend URL for production
  credentials: true, // Allow cookies
};
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(morgan('tiny'));

app.use("/api/user/", UserRoutes);
app.use(express.static('Public'))

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

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers",
  })
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
    const PORT = process.env.PORT || 8005; // Dynamic port
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

startServer();
