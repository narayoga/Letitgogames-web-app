const express = require('express');
const GameController = require('../controllers/gameController');
const accessbilityRouter = express.Router();
const PlayerController = require('../controllers/playerController')


accessbilityRouter.get('/', GameController.getAllGames)
accessbilityRouter.get('/:id', GameController.getGameById)
accessbilityRouter.post('/creategame', GameController.createGames)
accessbilityRouter.post('/register', PlayerController.createPlayer)
accessbilityRouter.post('/login', PlayerController.signedPlayer)
accessbilityRouter.put('/:id', GameController.updateGames)

module.exports = {accessbilityRouter}