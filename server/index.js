import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import errorHandler from "./middleware/ErrorMiddleware.js";

import authRoute from "./routes/AuthRoute.js";
import streamsRoute from "./routes/StreamsRoute.js";
import tagsRoute from "./routes/TagsRoute.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/streams", streamsRoute);
app.use("/api/v1/tags", tagsRoute);

// Error Handler

app.use(errorHandler);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  });

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
