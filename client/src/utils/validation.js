import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    password: yup.string().required("Required"),
    email: yup.string().email("Enter valid email").required("Required")
});

export const registerSchema = yup.object().shape({
    fullName: yup.string().min(2, "To short").required("Required"),
    email: yup.string().email("Required").required("Required"),
    role: yup.number().min(0).max(1).required("Required"),
    password: yup.string().min(6, "To short").max(16, "To long").required("Required"),
    confirmPassword: yup.string()
        .test(`must be not equal`,
            function (value) {
                const {password} = this.parent;
                return value === password;
            }
        ).required("Required"),
    // .oneOf([yup.ref.password, null], 'Passwords are not the same!').required("Required"),
});

export const nameContestSchema = yup.object().shape({
    name: yup.string().min(1, "To short").required("Required"),
    contest_type: yup.mixed().oneOf(['Name'], 'Wrong type').required("Required"),
    type_name: yup.string().required("Required"),
    // isActive: yup.boolean().required("Required"),
    // completed: yup.boolean().required("Required"),
    // days_left: yup.number().required("Required"),
    // prize: yup.number().required("Required"),
    industry: yup.string().required("Required"),
    preferences: yup.string().required("Required"),
    // venture_name: yup.string().required("Required"),
    venture_description: yup.string().required("Required"),
    target_customer_id: yup.string().required("Required"),
});

export const logoContestSchema = yup.object().shape({
    name: yup.string().min(1).required(),
    contest_type: yup.mixed().oneOf(['Logo']).required("Required"),
    type_name: yup.string().required("Required"),
    // isActive: yup.boolean().required(),
    // completed: yup.boolean().required(),
    // days_left: yup.number().required(),
    // prize: yup.number().required(),
    industry: yup.string().required("Required"),
    preferences: yup.string().required("Required"),
    // venture_name: yup.string().required("Required"),
    venture_description: yup.string().required("Required"),
    target_customer_id: yup.number().required("Required"),
});

export const taglineContestSchema = yup.object().shape({
    name: yup.string().min(1).required(),
    contest_type: yup.mixed().oneOf(['Tagline']).required(),
    type_name: yup.string().required("Required"),
    // isActive: yup.boolean().required(),
    // completed: yup.boolean().required(),
    // days_left: yup.number().required(),
    // prize: yup.number().required(),
    industry: yup.string().required("Required"),
    preferences: yup.string().required("Required"),
    // venture_name: yup.string().required("Required"),
    venture_description: yup.string().required("Required"),
    target_customer_id: yup.number().required("Required"),
});

export const premiumSuggestionSchema = yup.object().shape({
    text: yup.string().test('To short', function (value) {
        const {type} = this.parent;
        switch (type) {
            case 'logo':
                return true;
            case 'name':
                return value.length>1;
            case 'tagline':
                return value.length>1;
            default:
                return true;
        }
    }),
    type: yup.mixed().oneOf(['logo', 'name', 'tagline']).required("Required"),
    creatorId: yup.number().required("Required"),
    description: yup.string().min(3).max(5000).required("Required"),
    useCases: yup.string().min(3).max(5000).required("Required"),
    prize: yup.number().required("Required"),
});

export const filterSchema = yup.object().shape({
    type_index: yup.number().oneOf[1, 2, 3, 4, 5, 6, 7],
    contest_id: yup.string(),
    awardSort: yup.string().matches(/(desc|asc)/),
    industry: yup.string()
});

export const cardSchema = yup.object().shape({
    cardNumber: yup.string().trim().max(16).required("Required"),
    date: yup.string().max(7).required("Required"),
    cvc: yup.string().min(3).max(4).required("Required"),
});
