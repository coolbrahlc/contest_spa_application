const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const {UserAlreadyExistsError,
        ApplicationError,
        UserNotFoundError} = require('../../utils/customErrrors/errors');
const config = require('../../utils/consts');


module.exports.register = async (req, res, next) => {
    try {
        const {name, password, email, role} = req.body;
        let encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        let registerUser = await db.Users.create({
            full_name: name,
            email,
            password: encryptedPassword,
            updated_at: Date.now(),
            role,
        });
        if(registerUser){
            req.decoded ={};
            req.decoded.id = registerUser.id;
            req.decoded.role = registerUser.role;
            req.body.user = registerUser;
            next();
        }
    } catch (error) {
        next(new UserAlreadyExistsError());
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const user = await db.Users.findOne({where:{email: req.body.email}});
        if (user) {
            const isEqual = await bcrypt.compare(req.body.password, user.password);
            if (isEqual) {
                const token = jwt.sign({ id: user.id, role: user.role}, config.SECRET, {expiresIn: '30d'});

                const updated = await user.update({ token });
                if(updated) {
                    res.send({message: 'Successfull login',
                        token,
                        user,
                        id: user.id,
                        role: user.role,
                    });
                }
                else{
                    next(new ApplicationError());
                }
            } else {
                next(new UserNotFoundError());
            }
        } else {
            next(new UserNotFoundError());
        }
    } catch(err) {
        next(new ApplicationError(err));
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        let edit = Object.values(req.body);
        edit = JSON.parse(edit[0]);
        const { id } = req.decoded;

        const profilePic = req.files['profilePic'] ;  // adding file path

        if (profilePic) {
            console.log('have pic');
            edit.profile_picture = profilePic[0].filename;
        }

        const updated = await db.Users.update(edit, {
            where: {
                id,
            },
            returning: true,
        });
        if (updated[0]<1) {
            throw new ApplicationError('User not found');
        }
        const updatedUser = updated[1][0].dataValues;
        const { full_name, profile_picture, email } = updatedUser;
        console.log({ full_name, profile_picture, email });
        res.status(200).send({
            full_name,
            profile_picture,
            email,
        });
    }
    catch (e) {
        console.log(e)
        next(new ApplicationError('Internal error'));
    }
};

