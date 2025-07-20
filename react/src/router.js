import React, { useState, useEffect, useCallback } from 'react';

const RouterContext = React.createContext();

const getPath = () => {
  return window.location.pathname;
};

const setPath = (path) => {
  window.history.pushState({}, '', path);
};

export const RouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(getPath());

  const handlePopState = useCallback(() => {
    setCurrentPath(getPath());
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const navigate = (path) => {
    setPath(path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const context = React.useContext(RouterContext);
  return context.navigate;
};

export const Route = ({ path, component }) => {
  const context = React.useContext(RouterContext);
  if (context.currentPath === path) {
    return component;
  }
  return null;
};

export const Router = ({ children }) => {
  return children;
};
