CREATE TABLE IF NOT EXISTS users (
    user_id text PRIMARY KEY,
    first_name text,
    last_name text,
    battles text[],
    transactions text[],
    photo text,
    email text,
    current_gains_losses jsonb,
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

CREATE PROCEDURE public.create_transaction(IN transaction_id character varying, IN battle_id character varying, IN user_id character varying, IN transaction_timestamp character varying, IN action character varying, IN symbol character varying, IN price numeric, IN quantity numeric)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO public.transactions (transaction_id, battle_id, user_id, action, symbol, price, quantity, transaction_timestamp)
   VALUES (create_transaction.transaction_id, create_transaction.battle_id, create_transaction.user_id, create_transaction.action, create_transaction.symbol, create_transaction.price, create_transaction.quantity, create_transaction.transaction_timestamp);
END;

CREATE PROCEDURE public.create_battle(IN battle_id character varying, IN battle_members character varying[], IN start_date_timestamp character varying, IN end_date_timestamp character varying, IN battle_name character varying)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO public.battles (battle_id, battle_members, start_date_timestamp, end_date_timestamp, battle_name)
   VALUES (create_battle.battle_id, create_battle.battle_members, create_battle.start_date_timestamp, create_battle.end_date_timestamp, create_battle.battle_name);
END;