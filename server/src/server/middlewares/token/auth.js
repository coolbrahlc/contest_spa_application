const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const {
    ApplicationError,
    UnauthorizedError,
    UserNotFoundError} = require('../../utils/customErrrors/errors');
const config = require('../../utils/consts');



module.exports.tokenCheck=(req,res,next)=>{
    const accessToken = req.get("Authorization");
    if (!accessToken) {
        next(new UnauthorizedError('need token'));
    }

    try {
        req.decoded = jwt.verify(accessToken, config.SECRET);
        const {id, role} = req.decoded;

        db.Users.findOne({where: {id: req.decoded.id} })
            .then(user=>{

                if(user.token!==accessToken){
                    throw new UnauthorizedError();
                }
                req.body.user = user;
                req.body.token = accessToken;
                next();
            })
            .catch(err=>{
                next(err)
            })

    } catch (err) {
        next(new UnauthorizedError('token error'));
    }
};


module.exports.createNewToken = (req,res,next) => {
    const {id, role} = req.decoded;
    req.body.token = jwt.sign({id: id, role: role}, config.SECRET, {expiresIn: "30d"});
    next();
};


module.exports.sendToken = (req,res,next) => {
    const {id, role} = req.decoded;
    res.send({
        token: req.body.token,
        role: role,
        id: id,
        message: 'Successful token check',
        user: req.body.user,
    });
};


module.exports.tokenUpdate= async (req,res, next) => {
    const {id} = req.decoded;
    const user = await db.Users.findOne({where: {id: id}});
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
                user: user,
            });
        }
        else{
            next(new ApplicationError());
        }
    }
};

