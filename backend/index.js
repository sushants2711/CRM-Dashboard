import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./config/db.connect.js";
import saleRouter from "./routers/salesAgent.router.js";
import leadRouter from "./routers/lead.router.js";
import commentRouter from "./routers/comment.router.js";
import tagRouter from "./routers/tag.router.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7060;

// connect db
connectDb();

// cookie-parser


// parse the request in json format
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// cors policy
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use(cors());

// api endpoints
app.use("/api/v1/sales", saleRouter);
app.use("/api/v1/lead", leadRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/tag", tagRouter);

// server listen
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});