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

module.exports.contestCreateValidator = (req, res, next) => {
    Promise.all(
        req.contests.map(contest => contestCreate.validate(contest))
    )
    .then(result => {
        next()
    })
    .catch((err) => {
        console.log(err);
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


export const contestCreate = yup.object().shape({
    name: yup.string().min(1, "Too short").required("Required"),
    type: yup.string().min(1, "Too short").required("Required"),
    target_customer: yup.string().min(1, "Too short").required("Required"),
    venture_name: yup.string(),
    industry: yup.string().min(1, "Too short").required("Required"),
    type_of_work: yup.string(),
    length: yup.number().positive('Age must be greater than zero'),
});


