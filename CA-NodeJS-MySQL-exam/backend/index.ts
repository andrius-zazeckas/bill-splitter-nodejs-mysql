import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./src/config";
import { PORT } from "./src/config";

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
