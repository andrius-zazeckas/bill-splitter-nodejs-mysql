import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { jwtSecret } from "../config";
import { MYSQL_CONFIG } from "../config";
import { Router } from "express";
import { isLoggedIn } from "../middleware";

const accountSchema = Joi.object({
  group_id: Joi.number().integer().required(),
});

const postAccount = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;
  let accountData = req.body;

  try {
    accountData = await accountSchema.validateAsync(accountData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const sendBadReqResponse = (message) => {
    res
      .status(400)
      .send({
        error: message,
      })
      .end();
  };

  if (!user_id) {
    return sendBadReqResponse("User ID is not provided");
  }

  const cleanUserId = +mysql.escape(user_id);

  if (
    cleanUserId < 0 ||
    Number.isNaN(cleanUserId) ||
    typeof cleanUserId !== "number"
  ) {
    return sendBadReqResponse("User ID must be a number");
  }

  const userExistsInGroup = `SELECT * FROM accounts WHERE group_id = ${accountData.group_id} AND user_id = ${user_id}`;
  const query = `INSERT INTO accounts (group_id, user_id) VALUES ( ${accountData.group_id}, ${cleanUserId})`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [isUserInGroup] = await con.execute(userExistsInGroup);

    if (Array.isArray(isUserInGroup) && isUserInGroup.length) {
      return res.send({
        message: `User is already in group ID: ${accountData.group_id}`,
      });
    }

    await con.execute(query);

    await con.end();

    res
      .status(200)
      .send({ message: `User was added to group ID: ${accountData.group_id}` });
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

const getAccounts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [groups] = await con.execute(
      `SELECT billspliter.groups.id AS group_id, billspliter.groups.name FROM accounts INNER JOIN billspliter.groups ON accounts.group_id = groups.id WHERE accounts.user_id = ${user_id}`
    );

    await con.end();

    return res.status(200).send(groups).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const accounts = Router();

accounts.post("/accounts", isLoggedIn, postAccount);
accounts.get("/accounts", isLoggedIn, getAccounts);
