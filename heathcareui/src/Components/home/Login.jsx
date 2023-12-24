import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    axios
      .post('http://localhost:3000/login', userData)
      .then((response) => {
        const result = response.data;
        if (result === 'Success') {
          navigate('/');
        } else {
          console.log('Login failed: ', result);
        }
      })
      .catch((error) => console.error('Login error: ', error));
  };

  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="register">
        <h2 className="mb-3 title">Login</h2>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group mb-2 was-validated">
            <label htmlFor="email" className="lb form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please enter your email</div>
          </div>
          <div className="form-group mb-2 was-validated">
            <label htmlFor="password" className="lb form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please enter a password</div>
          </div>
          <button type="submit" className="log btn btn-success w-45 mt-2">
            LOGIN
          </button>
          <button
            type="button"
            className="reg btn btn-success w-45 mt-2"
            onClick={() => navigate('/register')}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
