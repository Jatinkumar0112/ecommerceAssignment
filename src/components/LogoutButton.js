import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { logout } from '../features/auth/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button type="danger" onClick={handleLogout} style={{ marginTop: '20px' }}>
      Logout
    </Button>
  );
};

export default LogoutButton;
