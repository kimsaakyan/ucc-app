import React from 'react';
import UsersTable from '../components/users/UsersTable';

const UserManagementPage = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-gray-100 min-h-screen">
            <UsersTable />
        </div>
    );
};

export default UserManagementPage;
