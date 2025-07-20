import React, { useState } from 'react';
import { useNavigate } from '../router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import '../styles/Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder for API call
    console.log('Login attempt with:', { email, password });
    navigate('/feed');
  };

  return (
    <div className="vk-auth-container">
      <Card className="vk-auth-card">
        <h2 className="vk-auth-title">Вход ВКонтакте</h2>
        <form onSubmit={handleLogin}>
          <div className="vk-form-group">
            <Input
              type="email"
              placeholder="Эл. почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="vk-form-group">
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button variant="primary" fullWidth type="submit">
            Войти
          </Button>
        </form>
        <div className="vk-auth-links">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/register')}
          >
            Зарегистрироваться
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
