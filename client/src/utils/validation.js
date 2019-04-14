import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string()
        .required('Required')
        .email('Input valid email'),
    password: yup.string()
        .required('Required')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .max(40, 'Password is too long - should be 40 chars max.'),
});

export const registerSchema = yup.object().shape({
    name: yup.string()
        .required('Field cannot be empty'),
    lastName: yup.string()
        .required('Field cannot be empty'),
    displayName: yup.string()
        .required('Field cannot be empty'),
    email: yup.string()
        .required('Field cannot be empty')
        .email('Input valid email'),
    password: yup.string()
        .required('Field cannot be empty')
        .max(40, 'Password is too short - should be 6 chars minimum.')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')

});

export const nameContestSchema = yup.object().shape({
    contestName: yup.string().min(1, "Too short").required("Required"),
    targetCustomer: yup.string().min(1, "Too short").required("Required"),
    industry: yup.string().min(1, "Too short").required("Required"),
    length: yup.number().positive('Age must be greater than zero'),
});

export const logoContestSchema = yup.object().shape({
    contestName: yup.string().min(1, "Too short").required("Required"),
    targetCustomer: yup.string().min(1, "Too short").required("Required"),
    industry: yup.string().min(1, "Too short").required("Required"),
    ventureName: yup.string().min(1, "Too short").required("Required"),
    length: yup.number().positive('Age must be greater than zero'),
});

export const taglineContestSchema = yup.object().shape({
    contestName: yup.string().min(1, "Too short").required("Required"),
    targetCustomer: yup.string().min(1, "Too short").required("Required"),
    industry: yup.string().min(1, "Too short").required("Required"),
    ventureName: yup.string().min(1, "Too short").required("Required"),
    length: yup.number().positive('Age must be greater than zero'),
});

export const cardSchema = yup.object().shape({
    cardNumber: yup.string().min(19, 'Too short').required("Required"),
    date: yup.string().max(7).required("Required"),
    code: yup.string().min(3).max(4).required("Required"),
});
