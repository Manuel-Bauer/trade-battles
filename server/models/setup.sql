CREATE TABLE IF NOT EXISTS users (
    user_id text PRIMARY KEY,
    first_name text,
    last_name text,
    battles text[],
    transactions text[],
    photo text,
    email text,
    current_gain_loss jsonb,
    watchlist text[]
);
CREATE TABLE IF NOT EXISTS battles (
    battle_id text PRIMARY KEY,
    battle_members text[],
    start_date_timestamp text,
    end_date_timestamp text,
    battle_name text
);
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id text PRIMARY KEY,
    battle_id text,
    user_id text,
    action text,
    symbol text,
    price numeric,
    quantity numeric,
    transaction_timestamp text
);