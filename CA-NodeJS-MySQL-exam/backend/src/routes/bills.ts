import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config";
import Joi from "joi";
import { Router } from "express";
import { isLoggedIn } from "../middleware";

const newBillSchema = Joi.object({
  group_id: Joi.number().required(),
  amount: Joi.number().required(),
  description: Joi.string().trim().required(),
});

const billSchema = Joi.object({
  group_id: Joi.number().required(),
});

const postBill = async (req, res) => {
  let newBillData = req.body;

  try {
    newBillData = await newBillSchema.validateAsync(newBillData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const query = `INSERT INTO bills (group_id, amount, description) VALUES (${newBillData.group_id}, ${newBillData.amount}, '${newBillData.description}')`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send({ message: `Bill added succesfully` });
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

const getBills = async (req, res) => {
  let billData = req.params;

  try {
    billData = await billSchema.validateAsync(billData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [groups] = await con.execute(
      `SELECT * FROM bills WHERE group_id = ${billData.group_id}`
    );

    await con.end();

    return res.status(200).send(groups).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const bills = Router();

bills.post("/bills", isLoggedIn, postBill);
bills.get("/bills/:group_id", isLoggedIn, getBills);
