import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import { jwtSecret } from "../config";
import jwt from "jsonwebtoken";
import { Router } from "express";

const postGroup = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { name } = req.body;

  let payload = null;

  if (!token) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  const sendBadReqResponse = (message) => {
    res
      .status(400)
      .send({
        error: message,
      })
      .end();
  };

  if (!name) {
    return sendBadReqResponse("Please input name for group!");
  }

  const cleanName = mysql.escape(req.body.name?.trim());

  if (typeof cleanName !== "string") {
    return sendBadReqResponse("Please input name as a string!");
  }

  const query = `INSERT INTO billspliter.groups (name) VALUES ( ${cleanName})`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send({ message: `Group ${cleanName} was added` });
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

const getGroups = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [groups] = await con.execute("SELECT * FROM `groups`");

    await con.end();

    return res.status(200).send(groups).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const groups = Router();

groups.post("/groups", postGroup);
groups.get("/groups", getGroups);
