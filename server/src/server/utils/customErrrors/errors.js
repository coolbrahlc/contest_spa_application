class ApplicationError extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message ||
            'Internal server error.';
        this.status = status || 500;
    }
}


class WrongPasswordError extends ApplicationError{
    constructor(message){
        super(message || "Wrong password!", 400);
    }
}


class BankError extends ApplicationError{
    constructor(message){
        super(message || "Invalid bank data!", 400);
    }
}

class BalanceError extends ApplicationError{
    constructor(message){
        super(message || "Not enough money on balance!", 400);
    }
}

class TransactionError extends ApplicationError{
    constructor(message){
        super(message || "Transaction error!", 400);
    }
}

class UserAlreadyExistsError extends ApplicationError{
    constructor(message){
        super(message || "User already exists!", 400);
    }
}

class UnauthorizedError extends ApplicationError{
    constructor(message){
        super(message || "Unauthorized!", 403);
    }
}

class UserNotFoundError extends ApplicationError{
    constructor(message){
        super(message || "User not found!", 404);
    }
}

class UpdateError extends ApplicationError{
    constructor(message){
        super(message || "Error while updating!", 400);
    }
}
module.exports.ApplicationError = ApplicationError;
module.exports.UserAlreadyExistsError = UserAlreadyExistsError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.UserNotFoundError = UserNotFoundError;
module.exports.UpdateError = UpdateError;
module.exports.WrongPasswordError = WrongPasswordError;
module.exports.BankError = BankError;
module.exports.BalanceError = BalanceError;
module.exports.TransactionError = TransactionError;
