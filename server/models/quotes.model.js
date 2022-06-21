const fetch = require('node-fetch');
require('dotenv').config();

const IEXapibaseurl = 'https://cloud.iexapis.com/stable';
const PoligonApiBaseUrl = 'https://api.polygon.io/v2/aggs/ticker';

exports.getQuote = async (symbol) => {
  const quote = await fetch(
    `${IEXapibaseurl}/stock/${symbol.toLowerCase()}/quote?token=${
      process.env.IEX_API_KEY
    }`
  ).then((res) => res.json());

  return quote;
};

exports.getHistoricalData = async (
  ticker,
  periodicity,
  periodicity_unit,
  start_date,
  end_date
) => {
  console.log('inside getHistorical');
  const convertDate = (timestamp) => {
    date = new Date(Number(timestamp));
    return date.toISOString().split('T').slice(0, 1).join('');
  };
  const startDate = convertDate(start_date);
  const endDate = convertDate(end_date);
  const url = `${PoligonApiBaseUrl}/${ticker.toUpperCase()}/range/${periodicity_unit}/${periodicity}/${start_date}/${end_date}?adjusted=true&sort=asc`;
  console.log(url);
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.POLYGON_API_KEY}`,
    },
  }).then((res) => res.json());
  console.log(data);
  return data;
};
