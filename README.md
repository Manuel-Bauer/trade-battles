# trade-battles-legacy

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
