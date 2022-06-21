const transactions_model = require('../models/transactions.model');
import { Request, Response } from 'express';

exports.getAllTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await transactions_model.getAllTransactions();
    res.send(transactions.rows);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getTransactionsByBattle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await transactions_model.getTransactionsByBattle(
      req.params['id']
    );
    res.send(transactions.rows);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await transactions_model.getTransaction(
      req.params['id']
    );
    res.send(transaction.rows);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.postTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await transactions_model.createTransaction(req.body);
    res.status(201);
    res.send(req.body);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await transactions_model.deleteTransaction(
      req.params['id']
    );
    res.status(200);
    res.send(transaction);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
