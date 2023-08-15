import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = 
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return isLoggedIn;
};

export default useAuth;
