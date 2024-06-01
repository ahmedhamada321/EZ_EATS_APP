import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber
    );
  };

  const handleLogin = async () => {
    if (!validateUsername(username)) {
      message.error("Invalid username format");
      return;
    }
    if (!validatePassword(password)) {
      message.error(
        "Password must be at least 8 characters long and include uppercase, lowercase letters, and numbers"
      );
      return;
    }
    try {
      await Parse.User.logIn(username, password);
      message.success("Logged in successfully!");
      navigate("/orders");
    } catch (error) {
      message.error("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form className="login-form" onSubmitCapture={handleLogin}>
        <Form.Item>
          <Input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
