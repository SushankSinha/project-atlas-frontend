import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  alg: "RS256",
  typ : 'jwt',
  withCredentials : true,
  httpOnly : true,
  baseURL: 'https://atlas-tool-server.onrender.com'
});

const token = Cookies.get('token');

if (token) {
  instance.defaults.headers.common['Authorization'] = (`Bearer ${token}`, {
    Accept : 'application/json',
    'Content-Type' : 'application/json'
  });
}

export default instance;
