import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

const Profile = () => {
    const { currentUser  } = useSelector(state => state.user);
    return (
        <AppLayout>
            { !currentUser ? <LoginForm/> : <UserProfile /> }
        </AppLayout>
    );
};

export default Profile;