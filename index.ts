import express from "express";
import { connect } from "./db";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { api } from "./routes/routes";
import { authMiddleware } from "./helpers/middleware";
import { loginUser, registerUser } from "./controllers/userController";

const app = express();
const PORT = process.env.PORT || 3000;
const apiRoute = api;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Buddy");
});

app.post("/register", registerUser);
app.post("/login", loginUser);

app.use(authMiddleware);

app.use("/api", apiRoute);

const startServer = async () => {
  await connect(process.env.MONGO_URL!, process.env.MongoDbName!);
  app.listen(PORT, () => {
    console.log("Api is started");
  });
};
startServer();
