import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserManagementPage from './pages/UserManagementPage';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthorized, fetchAuthMe, logout } from './redux/slices/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlockedModal from './components/modals/BlockedModal';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthorized);
    const navigate = useNavigate();

    const [isBlockedModalVisible, setBlockedModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchAuthMe())
            .then(() => {})
            .catch(() => {});
    }, []);

    return (
        <>
            <div className="">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route
                            path="managment/users"
                            element={<UserManagementPage />}
                        />
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Routes>
            </div>
            {isBlockedModalVisible && <BlockedModal />}
        </>
    );
}

export default App;
