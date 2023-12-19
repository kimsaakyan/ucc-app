const registerValidation = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    if (!values.fullName) {
        errors.fullName = 'Email is required';
    }

    if (values.fullName.length < 3) {
        errors.fullName = 'Minimum length is 3 characters';
    }

    return errors;
};

export default registerValidation;
