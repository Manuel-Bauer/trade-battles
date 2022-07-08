# trade-battles-legacy

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="http://matchup.vercel.app/">
    <img src="logo.png" alt="Logo" width="60" height="60">
  </a>

  <h4 align="center">TradeBattles</h4>

  <p align="center">
    Trade against your friends
  </p>
</div>

[![Trade Battles Screen Shot][product-screenshot]]

Looking for a fun and easy way to meet up and play sports with locals in your city? MatchUp makes it simple and quick to connect with other sports enthusiasts in your area so you can hit the court, field, or course in no time!
By requiring a small commitment deposit of 5€, we make sure that people that signed up to a MatchUp actually appear. If they do,
the deposit gets refunded - but if not, it will be automatically donated to a local charity organization.


## Backend

Requires PostgreSQL >14.0 for procedures in sql script

For the app to work it needs two api keys that are inside /server/models/config

The first one you can get from https://iexcloud.io
The second one from https://polygon.io

For the database you will need 3 tables: users, battles and transactions.

- See automated sql script in server/controllers/models/setup.sql

users:

user_id: text PRIMARY KEY
first_name: text
last_name: text
battles: text[]
transactions: text[]
photo: text
email: text
current_gains_losses: jsonb
watchlist: text[]

battles:

battle_id: text PRIMARY KEY
battle_members: text[]
start_date_timestamp: text
end_date_timestamp: text
battle_name: text

transactions:

transaction_id: text PRIMARY KEY
battle_id: text
user_id: text
action: text
symbol: text
price: numeric
quantity: numeric
transaction_timestamp: text

## .env file requirements

- DB

  - HOST
  - USERNAME
  - PASSWORD
  - PORT
  - DBNAME

- API

  - IEX_API_KEY
  - POLYGON_API_KEY

## IOS Requirements

- Installations

  - Xcode

- Files

  - [GoogleService-info.plist](https://support.google.com/firebase/answer/7015592?hl=en#ios&zippy=%2Cin-this-article)

- Configurations

  - Signing & Capabilities
    - Team (must be trusted or changed for build to run)
  - Info
    - URL Types
      - Identifier (set to Bundle Identifier found in General)
      - URL Schemes (set to value of REVERSED_CLIENT_ID found in GoogleService-info file)
      - Role (Editor)

[product-screenshot]: ./title-image.png