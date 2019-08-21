import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:53305/api`
});