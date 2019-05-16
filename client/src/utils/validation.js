export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength3 = minLength(3);

export const minLength6 = minLength(6);

export const tooShort = value =>
    value && value < 1
        ? 'Contest do not meet the minimum length requirement!'
        : undefined;

export const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords dont match' : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
