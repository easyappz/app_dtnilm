import React from 'react';
import { RouterProvider, Route, Router } from './router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider>
        <Router>
          <Route path="/login" component={<LoginPage />} />
          <Route path="/register" component={<RegisterPage />} />
          <Route path="/feed" component={<FeedPage />} />
          <Route path="/profile" component={<ProfilePage />} />
          <Route path="/messages" component={<MessagesPage />} />
          <Route path="/" component={<LoginPage />} />
        </Router>
      </RouterProvider>
    </ErrorBoundary>
  );
}

export default App;
