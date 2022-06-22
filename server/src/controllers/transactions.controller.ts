import { createTransaction } from '../models/transactions.model';
import { Request, Response } from 'express';

export const postTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201);
    res.send(req.body);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};