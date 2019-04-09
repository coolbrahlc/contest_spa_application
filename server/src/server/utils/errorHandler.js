module.exports.errorHandler = (err, req, res, next) => {
    console.log(err);
    if(!err.status){
        console.log(err);
        res.status(500).send(err);
    }
    else {
        console.log(err);
        res.status(err.status).send(err);
    }
};
