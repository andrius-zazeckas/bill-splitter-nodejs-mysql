import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { MYSQL_CONFIG } from "../config";
import { jwtSecret } from "../config";
import jwt from "jsonwebtoken";
import { expiresIn } from "../config";
import { Router } from "express";

const newUserSchema = Joi.object({
  full_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const registerUser = async (req, res) => {
  let newUserData = req.body;

  try {
    newUserData = await newUserSchema.validateAsync(newUserData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  try {
    const hashedPassword = bcrypt.hashSync(newUserData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO users (full_name, email, password) VALUES (${mysql.escape(
        newUserData.full_name
      )},${mysql.escape(newUserData.email)}, '${hashedPassword}')`
    );

    await con.end();

    return res.status(201).send("User registered successfully").end();
  } catch (error) {
    if (error.message.includes("Duplicate entry ")) {
      return res
        .status(400)
        .send({ error: `Email ${newUserData.email} Already in use` });
    }

    return res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    return res.status(400).send({ error: "Incorrect email or password" }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [data] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`
    );

    await con.end();

    if (Array.isArray(data) && !data.length) {
      return res
        .status(400)
        .send({ error: "Incorrect email or password" })
        .end();
    }

    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    const userPayload = { id: data[0].id };

    if (isAuthed) {
      const token = jwt.sign(userPayload, jwtSecret, { expiresIn });

      return res.send({ message: "Succesfully logged in", token }).end();
    }

    return res.status(400).send({ error: "Incorrect email or password" }).end();
  } catch (error) {
    return res.status(500).send({ error: "Unexpected error" });
  }
};

export const auth = Router();

auth.post("/register", registerUser);
auth.post("/login", loginUser);
