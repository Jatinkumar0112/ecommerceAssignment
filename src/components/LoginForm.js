import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {notification, Form, Input, Button, Alert } from 'antd';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { email, password } = values;

      // Fetch user data from JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }

      const users = await response.json();
      const user = users.find((user) => user.email === email);

      if (user) {
        if (password === 'password123') {
          console.log("welcome")
          dispatch(loginSuccess(user));
          setError(null);
          notification.open({
            message: `Welcome, ${user.name}!`,
            description: 'You have successfully logged in.',
            duration: 5, // Auto close after 5 seconds
            placement: 'top',
          });
    
          // Redirect to home page
          setTimeout(() => {
            navigate('/');
          }, 5000);
          navigate('/'); 
        } else {
          setError('Incorrect password!');
        }
      } else {
        setError('User not found!');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>

      {error && <Alert message={error} type="error" showIcon />}
    </div>
  );
};

export default LoginForm;
