const yup=require('yup');


module.exports.registerValidator = (req, res, next) => {
    registrationSchem.validate(req.body)
        .then(next())
        .catch((err) => {
            next(err);
        });
};

module.exports.loginValidator = (req, res, next) => {
    loginSchem.validate(req.body)
        .then(next())
        .catch((err) => {
            next(err);
        });
};


const registrationSchem = yup.object().shape({
    name: yup.string().required().min(1),
    email: yup.string().email().required().min(4),
    password: yup.string().required().min(5),
    role: yup.number().min(0).max(1).required()
});


const loginSchem = yup.object().shape({
    email: yup.string().email().required().min(4),
    password: yup.string().required().min(5)
});


