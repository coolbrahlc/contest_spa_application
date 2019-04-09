const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const {UserAlreadyExistsError,
        WrongPasswordError,
        ApplicationError,
        UnauthorizedError,
        UserNotFoundError} = require('../../utils/customErrrors/errors');
const config = require('../../utils/consts');


module.exports.register = async (req, res, next) => {
    try {
        /*const foundUser = await db.Users.findOne({where: {email: req.body.email}});
        if (!foundUser) {*/
            const {name, password, email, role} = req.body;
            let encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            let registerUser = await db.Users.create({
                full_name: name,
                email: email,
                password: encryptedPassword,
                updated_at: Date.now(),
                role: role
            });
            if(registerUser){
                req.decoded ={};
                req.decoded.id = registerUser.id;
                req.decoded.role = registerUser.role;
                req.body.user = registerUser;
                next()
            }
        /*} else {
            next(new UserAlreadyExistsError());
        }*/
    } catch (error) {
        next(new ApplicationError(error.message));
    }
};


module.exports.login = async (req, res, next) => {

    try {
        const user = await db.Users.findOne({where:{email: req.body.email}});

        if (user) {
            const isEqual = await bcrypt.compare(req.body.password, user.password);
            if (isEqual) {
                const token = jwt.sign({ id: user.id, role: user.role}, config.SECRET, {expiresIn: '30d'});

                const updated = await user.update({token: token });
                if(updated) {
                    res.send({message: 'Successfull login',
                        token: token,
                        user: user,
                        id: user.id,
                        role: user.role,
                    })
                }
                else{
                    next(new ApplicationError());
                }
            } else {
                next(new UserNotFoundError())
            }
        } else {
            next(new UserNotFoundError())
        }
    } catch(err) {
        next(new ApplicationError(err));
    }
};


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
                console.log(accessToken)
                console.log(user.token)

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
    console.log(req.body.token)
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

