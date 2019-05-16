const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const {
    ApplicationError,
    UnauthorizedError,
    UserNotFoundError} = require('../../utils/customErrrors/errors');
const config = require('../../utils/consts');



module.exports.tokenCheck= async (req,res,next)=>{
  try {
    const accessToken = req.get("Authorization");
    if (!accessToken) {
      throw new UnauthorizedError('need token');
    }
    req.decoded = jwt.verify(accessToken, config.SECRET);
    const {id} = req.decoded;
    // TODO REMOVE?
    // if(user.token!==accessToken) {
    //     throw new UnauthorizedError();
    // }
    req.body.user = await db.Users.findOne({where: {id} });
    req.body.token = accessToken;
    next();
  } catch (err) {
    console.log(err);
    next(new UnauthorizedError('token error'));
  }
};


module.exports.createNewToken = (req,res,next) => {
  const {id, role} = req.decoded;
  req.body.token = jwt.sign({ id, role }, config.SECRET, {expiresIn: "30d"});
  next();
};


module.exports.sendToken = (req,res, next) => {
  const { id, role } = req.decoded;
  const { token, user } = req.body;
  res.send({
    token,
    role,
    id,
    user,
    message: 'Successful token check',
  });
};


module.exports.tokenUpdate= async (req,res, next) => {
    const { id } = req.decoded;
    const user = await db.Users.findOne({ where: { id } });
    if(!user){
        next(new UserNotFoundError());
    }
    else{
        const success = await user.update({token: req.body.token });
        if(success) {
            res.send({
                token: req.body.token,
                role: user.role,
                id: user.id,
                message: 'Successful token update',
                user,
            });
        }
        else{
            next(new ApplicationError());
        }
    }
};

