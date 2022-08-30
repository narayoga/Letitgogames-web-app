const { Games } = require ('../models')

class GameController{
  static async getAllGames(req,res,next){
    try {
      const games = await Games.findAll({attributes: {exclude: ['createdAt','updatedAt']}});
      if(games){
        return res.status(200).json({
          result: "Success",
          data: games,          
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req,res,next){
    try {
      const { id } = req.params;
      const game = await Games.findByPk(id);
      if (game) {
        return res.status(200).json({
          result: "Success",
          data: game,
        });
      } else {
        return res.status(404).json({
          result: "Not found",
          message: `game not found`,
        })
      }
    } catch (error) {
      next(error);
    }
  }

  static async createGames(req,res,next){
    try {
      const { gamesname, view, src, desc, banner} = req.body;
      const newGame = {
        gamesname,
        view,
        src,
        desc,
        banner
      }
      const createGame = await Games.create(newGame);
      if(createGame){
        return res.status(200).json({
          result: "Success",  
          data: createGame,        
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateGames(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Games.findByPk(id);
      if (!game) {
        return res.status(404).json({
          result: "Not found",
          message: `Game with id: ${id} not found`,
        })
      }
      const updatedGame= await Games.update(req.body,{
        where: { id: id },
      });
      if (updatedGame == 1) {
        return res.status(200).json({
          result: "Success",
          message: `Game with id: ${id} successfully updated`,
        });
      } else {
        return res.status(500).json({
          result: "Failed",
          message: "Failed to update",
        });
      }
    } catch (error) {
      next(error);
    }
  }

}

module.exports =  GameController 