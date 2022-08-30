const { Players } = require('../models')
const { hashPassword, verifyPassword } = require('../middlewares/passwordHandler')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class PlayerController{
  static async createPlayer(req, res, next){
    try {
      const { username, email, password} = req.body;
      if (!username || !email) {
        res.status(400).json({
          result: "Failed",
          message: "username or email cannot be empty",
        });
      }
      if (!password) {
        res.status(400).json({
          result: "Failed",
          message: "Password cannot be empty"
        })
      }
      if (password.length < 8) {
        return res.status(400).json({
          result: "Failed",
          message: "Password must contain at least eight character"
        })
      }
      const newPlayer = {
        username,
        email,
        password: await hashPassword(password),
        src : 'https://res.cloudinary.com/alternate-cloud/image/upload/v1658843311/letitimages/d8e9sqsek4saf4ikv21j.jpg'
      };
      const createdPlayer = await Players.create(newPlayer);
      if (createdPlayer) {
        return res.status(201).json({
          result: "Success",
          data: createdPlayer,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPlayers(req, res, next){
    try {
      let conditions = [];
      const { username, email, password } = req.query;
      if (username) {
        conditions.push({ username });
      }
      if (email) {
        conditions.push({ email });
      }
      if (password) {
        conditions.push({ password:hashPassword(password) })
      }

      const data = await Players.findAll({
        where: {
          [Op.and]: conditions
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (data) {
        return res.status(200).json({
          result: "Success",
          data: data,          
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPlayerById(req, res, next){
    try {
      const { id } = req.params;
      const player = await Players.findByPk(id);
      if (player) {
        return res.status(200).json({
          result: "Success",
          data: player,
        });
      } else {
        return res.status(404).json({
          result: "Not found",
          message: `Player with id: ${id} not found`,
        })
      }
    } catch (error) {
      next(error);
    }
  }

  static async updatePlayer(req, res, next){
    try {
      const { id } = req.params;
      const player = await Players.findByPk(id);
      if (!player) {
        return res.status(404).json({
          result: "Not found",
          message: `Player with id: ${id} not found`,
        })
      }
      const updatedPlayer = await Players.update(req.body,{
        where: { id: id },
      });
      if (updatedPlayer == 1) {
        return res.status(200).json({
          result: "Success",
          message: `Player with id: ${id} successfully updated`,
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

  static async deletePlayer(req, res, next) {
    try {
      const { id } = req.params;

      const destroyed = await Players.destroy({
        where: { id: id },
      });
      if (destroyed == 1) {
        res.status(200).json({
          result: "Success",
          message: `Player with id: ${id}, was deleted successfully`,
        });
      } else {
        res.status(400).json({
          result: "Failed",
          message: `Cannot delete Player with id=${id}. Maybe Player was not found!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async signedPlayer(req,res,next){
    try {
      const { username, email, password } = req.body;
      if (!username || !email) {
        res.status(400).json({
        result: 'Failed',
          message: 'username or email cannot be empty',
        });
      }
      if (!password){
        res.status(400).json({
          result: 'Failed',
          message: 'password cannot be empty',
          });
      }
      const Player = await Players.findOne({where:{username,email}});
      const hashedPassword = await hashPassword(password);
      const isValid = await verifyPassword(password,hashedPassword);
      if (!Player) {
        res.status(400).json({
          result: 'Failed',
          message: "Invalid Username",
        });
      }
      if (!isValid) {
        res.status(400).json({
          result: 'Failed',
          message: "password doesn't match",
          passworddatabase: Player.password,
          passwordinput: hashedPassword
        });
      } else {
        const payload = {
          id: Player.id,
          username : Player.username,
          email: Player.email,
          birth: Player.birth,
          country: Player.country,
          bio: Player.bio,
          src: Player.src
        };
        const src = Player.src
        const secret = process.env.SECRET;
        const token = jwt.sign(payload, secret, {expiresIn: '1 hour', noTimestamp: true});
        // res.cookie('token',token)
        // console.log(payload)
        res.status(200).json({
          result: 'Success',
          data: payload,
          src: src,
          token: token,
          passworddatabase: Player.password,
          passwordinput: hashedPassword         
        });
      }     
    } catch (error) {
      next(error);
    }
  }

}
module.exports = PlayerController



// static async signedPlayer(req,res,next){
//   try {
//     const { username, email, password } = req.body;
//     const Player = await Players.findOne({where:{username,email}});
//     if(Player) {
//       const auth = await bcrypt.compare(password, Player.password)
//       if(auth) {
//         const payload = {
//           id: Player.id,
//           username : Player.username,
//           email: Player.email,
//         };
//         const secret = process.env.SECRET;
//         const token = jwt.sign(payload,secret,{expiresIn: '1 hour', noTimestamp: true});
//         res.status(200).json({
//           result: 'Success',
//           data: payload,
//           token: token,
//           passworddatabase: Player.password,
//           passwordinput: password          
//         });
//       } else if(!auth){
//         res.status(400).json({
//           result: 'Failed',
//           message: "password doesn't match",
//           passworddatabase: Player.password,
//           passwordinput: password,
//           auth: auth
//         });
//       }
//     } else{
//       res.status(400).json({
//         result: 'Failed',
//         message: "Invalid Username"
//       })
//     }
//   } catch (error) {
//     next(error);
//   }
// }