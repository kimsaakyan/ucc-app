import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthorized } from '../redux/slices/auth';

import { fetchAuth } from '../redux/slices/auth';
import BlockedModal from './modals/BlockedModal';

import { useFormik } from 'formik';
import signupValidation from '../utils/validations/signupValidation';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthorized);
    const [isBlockedModalVisible, setBlockedModalVisible] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: signupValidation,
        onSubmit: async (values) => {
            try {
                const userData = await dispatch(fetchAuth(values));
                if (!userData.payload) {
                    alert('Не удалось авторизоваться');
                    return;
                }
                if (userData.payload.isBlocked) {
                    // alert('ВЫ заблокированы');
                    setBlockedModalVisible(true);
                    return;
                }
                if ('token' in userData.payload) {
                    window.localStorage.setItem(
                        'token',
                        userData.payload.token
                    );
                    navigate('/');
                }
            } catch (error) {
                alert('Не удалось авторизоваться');
                return;
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
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
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
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 ">
                                Don’t have an account yet?{' '}
                                <Link
                                    to="/register"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                            <p className="text-sm font-light text-gray-500">
                                Return to the{' '}
                                <Link
                                    to="/"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    main page
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            {isBlockedModalVisible && (
                <BlockedModal
                    isBlockedModalVisible={isBlockedModalVisible}
                    toggleBlockedModal={setBlockedModalVisible}
                />
            )}
        </section>
    );
};

export default Login;
