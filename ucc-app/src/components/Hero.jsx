import React from 'react';
import { useSelector } from 'react-redux';
import { isAuthorized } from '../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import Modal from './modals/Modal';
import { useState } from 'react';

const Hero = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthorized);
    const [isModalVisible, setModalVisible] = useState(false);

    const onClickHandler = () => {
        if (isAuth) {
            navigate('/managment/users');
        } else {
            setModalVisible(true);
        }
    };

    return (
        <section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-gray-100 min-h-screen">
            <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leadi sm:text-5xl">
                    User Control Center
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">
                    {isAuth
                        ? `Welcome! You now have access to the User Control Center. Feel free to explore and manage any accounts with full privileges.`
                        : 'To access the User Control Center, authentication is  required. Please log in to gain entry.'}
                </p>
                <div className="flex flex-wrap justify-center">
                    <button
                        onClick={onClickHandler}
                        className="px-8 py-3 m-2 text-lg font-semibold rounded bg-white text-gray-900 uppercase"
                    >
                        go to User Control System
                    </button>
                </div>
            </div>
            {isModalVisible && (
                <Modal
                    isModalVisible={isModalVisible}
                    toggleModal={setModalVisible}
                />
            )}
        </section>
    );
};

export default Hero;
