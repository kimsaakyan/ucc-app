import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthorized } from '../redux/slices/auth';

const MainMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthorized);

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    console.log(isAuth);

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    return (
        <div className="navbar bg-white-500">
            <div className="flex-1 px-2 lg:flex-none">
                <Link to="." className="text-lg font-bold">
                    UCC
                </Link>
            </div>
            <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                    {isAuth ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost rounded-btn"
                            >
                                Settings
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                            >
                                <li>
                                    <button onClick={() => logoutHandler()}>
                                        Log out
                                    </button>
                                </li>
                                <li>
                                    <Link to="/managment/users">
                                        User Management
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn btn-ghost rounded-btn uppercase"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-ghost rounded-btn uppercase"
                            >
                                Create Account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
