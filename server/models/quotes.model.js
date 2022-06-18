const fetch = require('node-fetch');
require('dotenv').config();

exports.getQuote = async (symbol) => {
  const quote = await fetch(
    `https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/quote?token=${
      process.env.IEX_API_KEY
    }`
  ).then((res) => res.json());

  console.log(quote);

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
  const url = `https://polygon.io/${ticker.toUpperCase()}/range/${periodicity_unit}/${periodicity}/${start_date}/${end_date}?adjusted=true&sort=asc`;
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
