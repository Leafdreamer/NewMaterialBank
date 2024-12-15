import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AppContext from './Context';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try 
        {
            var otherEmail = encodeURIComponent(email)

            const response = await fetch('http://localhost:5096/api/Users/email?email=' + otherEmail, {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(email);
            AppContext.email = email;
            AppContext.admin = data.admin;

            
            if (data.email == email)
            {
                navigate('/materials');
            }
            else
            {
                setError('Invalid username or password');
            }
            
        } 
        catch (error) {
          setError('Invalid username or password');
        }
      };


      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      );

}

export default Login;