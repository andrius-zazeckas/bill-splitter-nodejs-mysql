import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import Joi from "joi";
import { Router } from "express";
import { isLoggedIn } from "../middleware";

const groupSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const postGroup = async (req, res) => {
  let groupData = req.body;

  try {
    groupData = await groupSchema.validateAsync(groupData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const query = `INSERT INTO billspliter.groups (name) VALUES ('${groupData.name}')`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send({ message: `${groupData.name} was added to groups` });
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

groups.post("/groups", isLoggedIn, postGroup);
groups.get("/groups", getGroups);
