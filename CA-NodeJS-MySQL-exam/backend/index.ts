import express from "express";
import cors from "cors";
import { PORT } from "./src/config";
import { auth } from "./src/routes/auth";
import { groups } from "./src/routes/groups";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", auth);
app.use("/", groups);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
