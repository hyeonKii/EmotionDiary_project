import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
    res.send("김민준 천재천재");
});

app.listen(process.env.PORT, () => {
    console.log("server is loaded on " + process.env.PORT);
});
