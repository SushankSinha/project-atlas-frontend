import React, { createContext, useContext, useState, useEffect} from 'react';
import api from '../api';
import {useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUser] = useState("developer");
    const navigate = useNavigate();
    
    const login = async (data) => {
      try {
        const response = await api.post('/login', data);
        if (response.status === 200) {
          if(response){
            localStorage.setItem('userId', response.data.user)
            localStorage.setItem('token', response.data.token)
            window.alert("Login Successful");
            navigate('/');
          }
        }
      } catch (error) {
        console.log('Login failed:', error);
      }
    };

    async function userRoleType(){
      const userId = localStorage.getItem('userId');
      try {
        const response = await api.get(`/user/${userId}`);
        if (response.status === 200) {
          setUser(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      userRoleType();
      // eslint-disable-next-line
    },[]);
    
  
    const logout = async () => {
      try {
        const res = await api.get('/logout');
        if(res.status === 200){ 
            localStorage.removeItem('userId');
            setUser("developer");
            localStorage.removeItem('token');
            window.alert("Logged out Successfully");
            navigate('/login');
        }
      } catch (error) {
        console.log('Logout failed:', error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ userRole, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);
