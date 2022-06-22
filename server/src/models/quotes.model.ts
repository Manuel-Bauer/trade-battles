import { fetch } from 'node-fetch';
import { Quote, historicalData } from '../../Types';
import { Response } from 'express';
require('dotenv').config(); // ❓❔

const IEXapibaseurl: string = 'https://cloud.iexapis.com/stable';
const PoligonApiBaseUrl: string = 'https://api.polygon.io/v2/aggs/ticker';

exports.getQuote = async (symbol): Promise<Quote> => {
  const quote = await fetch(
    `${IEXapibaseurl}/stock/${symbol.toLowerCase()}/quote?token=${
      process.env.IEX_API_KEY
    }`
  ).then((res: Response) => res.json());

  return quote;
};

exports.getHistoricalData = async (
  ticker: string,
  periodicity: any,
  periodicity_unit: string,
  start_date: string,
  end_date: string
): Promise<historicalData> => {
  const url = `${PoligonApiBaseUrl}/${ticker.toUpperCase()}/range/${periodicity_unit}/${periodicity}/${start_date}/${end_date}?adjusted=true&sort=asc`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.POLYGON_API_KEY}`,
    },
  }).then((res: Response) => res.json());
  return data;
};
