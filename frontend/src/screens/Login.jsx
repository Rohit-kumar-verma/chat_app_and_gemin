import React,{useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Login = () => {

    const {setUser} =useContext(UserContext)

  const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const navigate=useNavigate()

    function submitHandler(e){
        e.preventDefault()
        axios.post('/users/login',{
            email,
            password
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account? 
          <Link to="/register" className="text-blue-400 hover:underline"> Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
