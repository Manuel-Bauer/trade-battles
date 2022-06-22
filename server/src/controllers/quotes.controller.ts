const quotes_model = require('../models/quotes.model');
// import { quotes_model } from '../models/quotes.model';
import { Request, Response } from 'express';

exports.getQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await quotes_model.getQuote(req.params['symbol']);
    res.send(quote);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getHistoricalData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await quotes_model.getHistoricalData(
      req.params['ticker'],
      req.params['periodicity'],
      req.params['periodicity_unit'],
      req.params['start_date'],
      req.params['end_date']
    );

    res.send(data);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
