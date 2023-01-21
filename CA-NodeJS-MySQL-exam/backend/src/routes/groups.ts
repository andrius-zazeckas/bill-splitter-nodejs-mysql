import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import { Router } from "express";
import { isLoggedIn } from "../middleware";

const postGroup = async (req, res) => {
  const { name } = req.body;

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

groups.post("/groups", isLoggedIn, postGroup);
groups.get("/groups", isLoggedIn, getGroups);
