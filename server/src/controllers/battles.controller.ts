const {
  createBattle,
  updateBattle: update,
  getBattlesWithPortfolios
} = require('../models/battles.model');
import { Request, Response } from 'express';

export const getMyBattles = async (req: Request, res: Response): Promise<void> => {
  try {
    const myBattles = await getBattlesWithPortfolios(req.params['user_id']);
    res.send(myBattles);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const postBattle = async (req: Request, res: Response): Promise<void> => {
  try {
    const battle = await createBattle(req.body);
    res.send(battle);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


export const updateBattle = async (req: Request, res: Response): Promise<void> => {
  try {
    const battle_id = +req.params['battle_id'];
    const battle = await update(battle_id, req.body);
    res.send(battle);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
