import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import authService from '../appwrite/auth.service';

const Header = () => {
  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when starting logout
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false); // Set loading to false after logout attempt
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 flex justify-center w-full z-10'>
      <header className="w-[93%] mt-4 flex items-center border rounded justify-between py-2 px-8 bg-gray-100 shadow-md">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-lg font-bold bg-gradient-to-r from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent">IDEA FUSION</span>
        </div>
        <nav className="flex space-x-6">
          {status && <a onClick={() => navigate(`/myprofile`)} className="text-black-700 font-semibold hover:text-teal-600 cursor-pointer">MY PROFILE</a>}
          <a onClick={() => navigate('/allposts')} className="text-black-700 cursor-pointer font-semibold hover:text-teal-600">ALL POSTS</a>
        </nav>
        <div>
          {status ? (
            <>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLogout}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></div>
                ) : (
                  'Logout'
                )}
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded mr-2"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded mx-4"
                onClick={handleSignup}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
