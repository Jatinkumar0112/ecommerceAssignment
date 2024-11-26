import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notification, Form, Input, Button, Alert, Spin } from 'antd';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state

    try {
      const { username, password } = values;

      // Make a POST request to the fakestore API
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();

      // Store the token and update Redux store
      const { token } = data;
      dispatch(loginSuccess({ username, token }));

      notification.success({
        message: `Welcome, ${username}!`,
        description: 'You have successfully logged in.',
        duration: 3, 
      });

      
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? <Spin /> : 'Login'}
          </Button>
        </Form.Item>
      </Form>

      {error && <Alert message={error} type="error" showIcon />}
    </div>
  );
};

export default LoginForm;
