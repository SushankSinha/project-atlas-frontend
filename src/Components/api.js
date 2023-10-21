import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  alg: "RS256",
  typ : 'jwt',
  withCredentials : true,
  secure : true,
  httpOnly : true,
  baseURL: 'https://atlas-tool-server.onrender.com'
});

const token = Cookies.get('jwt');
console.log("jwt", token)
const tokenVar = Cookies.get('token');
console.log("tokenVar", tokenVar)

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
