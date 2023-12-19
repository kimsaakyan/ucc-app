import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticationModal = ({ stateOfRegistration, toggleModal }) => {
    const navigate = useNavigate();

    const onClickHandler = (action) => {
        switch (action) {
            case 'home': {
                toggleModal({
                    success: false,
                    isModalVisible: false,
                });
                navigate('/');
                break;
            }
            case 'login': {
                toggleModal({
                    success: false,
                    isModalVisible: false,
                });
                navigate('/login');
                break;
            }
            case 'tryReg': {
                toggleModal({
                    success: false,
                    isModalVisible: false,
                });
                navigate('/register');
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 w-[300px] h-[250px] flex flex-col items-center justify-between rounded-md space-y-2">
                <div>
                    {stateOfRegistration.success ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-20 h-20 text-green-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-20 h-20 text-red-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                        </svg>
                    )}
                </div>
                <p className="text-black text-center font-bold">
                    {stateOfRegistration.success
                        ? 'Account created successfully! Start exploring our features now.'
                        : 'Registration unsuccessful. Please check your information and try again.'}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={
                            stateOfRegistration.success
                                ? () => onClickHandler('login')
                                : () => onClickHandler('tryReg')
                        }
                        className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-md text-xs font-semibold"
                    >
                        {stateOfRegistration.success
                            ? 'Login Now'
                            : 'Try Again'}
                    </button>
                    <button
                        onClick={() => onClickHandler('home')}
                        className="bg-white border hover:bg-gray-50 text-gray-400 py-2 px-4 rounded-md text-xs font-semibold"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationModal;
