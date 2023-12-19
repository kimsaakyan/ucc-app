import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slices/users';
import {
    fetchUserRemove,
    fetchToggleUserBlock,
} from '../../redux/slices/users';
// import { isAuthorized } from '../../redux/slices/auth';
import ActionAlert from '../alerts/ActionAlert';

const UsersTable = () => {
    // const isAuth = useSelector(isAuthorized);
    const myID = useSelector((state) => state.auth?.data?._id);

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [selectedID, setSelectedID] = useState([]);
    const [isActionAlertVisible, setActionAlertVisible] = useState({
        description: '',
        success: false,
    });

    useEffect(() => {
        dispatch(fetchUsers())
            .then((users) =>
                setUsers(users.payload.filter((user) => user._id != myID))
            )
            .catch((err) => console.log(err));
    }, []);

    const handleCheckboxChange = (id, isChecked) => {
        // Ваш код обработки изменения состояния чекбокса
        setSelectedID((prevSelectedID) => {
            if (isChecked) {
                return [...prevSelectedID, id];
            } else {
                return prevSelectedID.filter((item) => item !== id);
            }
        });
    };

    const onClickHandler = (action) => {
        switch (action) {
            case 'remove': {
                if (selectedID !== null) {
                    dispatch(fetchUserRemove(selectedID))
                        .then(() => {
                            // Обновляем список пользователей после успешного удаления
                            dispatch(fetchUsers())
                                .then((users) => {
                                    setUsers(
                                        users.payload.filter(
                                            (user) => user._id != myID
                                        )
                                    );
                                    setActionAlertVisible({
                                        description:
                                            'User(s) removed successfully',
                                        success: true,
                                    });
                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                }
                break;
            }
            case 'block': {
                if (selectedID !== null) {
                    dispatch(
                        fetchToggleUserBlock({
                            id: selectedID,
                            action: 'block',
                        })
                    )
                        .then(() => {
                            dispatch(fetchUsers())
                                .then((users) => {
                                    setUsers(
                                        users.payload.filter(
                                            (user) => user._id != myID
                                        )
                                    );
                                    setActionAlertVisible({
                                        description:
                                            'User(s) blocked successfully',
                                        success: true,
                                    });
                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                }
                break;
            }
            case 'unblock': {
                if (selectedID !== null) {
                    dispatch(
                        fetchToggleUserBlock({
                            id: selectedID,
                            action: 'unblock',
                        })
                    )
                        .then(() => {
                            dispatch(fetchUsers())
                                .then((users) => {
                                    setUsers(
                                        users.payload.filter(
                                            (user) => user._id != myID
                                        )
                                    );
                                    setActionAlertVisible({
                                        description:
                                            'User(s) unblocked successfully',
                                        success: true,
                                    });
                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                }
                break;
            }
            default:
                break;
        }

        setTimeout(() => {
            setActionAlertVisible({
                description: '',
                success: false,
            });
        }, 2000);
    };

    return (
        <div className="max-w-screen-md mx-auto py-10 overflow-x-auto px-2">
            <div className="flex bg-white mb-2 rounded-md">
                <button
                    onClick={() => onClickHandler('remove')}
                    className="uppercase m-2 bg-transparent hover:bg-red-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                        <path
                            fillRule="evenodd"
                            d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => onClickHandler('block')}
                    className="m-2 bg-transparent hover:bg-yellow-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => onClickHandler('unblock')}
                    className="m-2 bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                    </svg>
                </button>
                {isActionAlertVisible.success && (
                    <ActionAlert
                        description={isActionAlertVisible.description}
                    />
                )}
            </div>
            <table className="table-auto w-full bg-white shadow-md rounded-md overflow-hidden">
                <thead className="bg-gray-400 text-gray-800">
                    <tr>
                        <th className="py-2 px-4">
                            <input type="checkbox" className="form-checkbox" />
                        </th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Last Login</th>
                        <th className="py-2 px-4 w-40">Status</th>
                    </tr>
                </thead>

                {users?.map((user) => {
                    return (
                        <tbody key={user._id}>
                            <tr className="bg-gray-100 text-blue-500 hover:bg-gray-200">
                                <td className="py-2 px-4">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                user._id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </td>
                                <td className="py-2 px-4">{user.fullName}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.lastLogin}</td>
                                <td
                                    className={`py-2 px-4 text-center uppercase font-bold text-xs ${
                                        user.isBlocked
                                            ? 'text-red-500'
                                            : 'text-green-500'
                                    }`}
                                >
                                    {user.isBlocked ? 'blocked' : 'active'}
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
};

export default UsersTable;
