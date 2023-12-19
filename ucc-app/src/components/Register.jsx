import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../redux/slices/auth';
import { useFormik } from 'formik';
import AuthenticationModal from './modals/AuthenticationModal';
import registerValidation from '../utils/validations/registerValidation';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState(null);

    const [isRegisteredSuccessfully, setRegisteredSuccessfully] = useState({
        success: false,
        isModalVisible: false,
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            password: '',
        },
        validate: registerValidation,
        onSubmit: async (values) => {
            try {
                const resp = await dispatch(fetchRegister(values));

                if (resp.meta.requestStatus === 'fulfilled') {
                    setRegisteredSuccessfully({
                        success: true,
                        isModalVisible: true,
                    });
                } else {
                    setRegisteredSuccessfully({
                        success: false,
                        isModalVisible: true,
                    });

                    console.log(resp.payload.errors);
                    setServerErrors(resp.payload.errors);
                    // alert('Произошла ошибка при регистрации');
                }
            } catch (error) {
                setRegisteredSuccessfully({
                    success: false,
                    isModalVisible: true,
                });

                // alert('Произошла ошибка при регистрации');
            }
        },
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = formik;

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create and account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                />
                                {errors.email && touched.email ? (
                                    <div className="text-red-500 font-bold text-xs">
                                        {errors.email}
                                    </div>
                                ) : null}
                                <div className="text-red-500 font-bold text-xs">
                                    {serverErrors
                                        ? serverErrors[0].msg
                                        : null}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Please enter your full name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                {errors.fullName && touched.fullName ? (
                                    <div className="text-red-500 font-bold text-xs">
                                        {errors.fullName}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                {errors.password && touched.password ? (
                                    <div className="text-red-500 font-bold text-xs">
                                        {errors.password}
                                    </div>
                                ) : null}
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-sky-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 ">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            {isRegisteredSuccessfully.isModalVisible ? (
                <AuthenticationModal
                    stateOfRegistration={isRegisteredSuccessfully}
                    toggleModal={setRegisteredSuccessfully}
                />
            ) : null}
        </section>
    );
};

export default Register;
