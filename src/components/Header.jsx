import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import authService from '../appwrite/auth.service';

const Header = () => {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 flex justify-center w-full z-10'>
      <header className="w-[93%] mt-4 flex items-center border rounded justify-between py-2 px-4 bg-gray-100 shadow-md">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-lg font-bold bg-gradient-to-r from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent">IDEA FUSION</span>
        </div>
        <nav className="flex space-x-4">
          {status && <a onClick={() => navigate(`/myprofile`)} className="text-black-700 font-semibold hover:text-teal-600">Profile</a>}
          <a onClick={() => navigate('/allposts')} className="text-black-700 font-semibold hover:text-teal-600">Posts</a>
        </nav>
        <div>
          {status ? (
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? <div className="animate-spin border-t-2 border-white rounded-full w-4 h-4"></div> : 'Logout'}
            </button>
          ) : (
            <>
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded mr-2" onClick={handleLogin}>Login</button>
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded" onClick={handleSignup}>Signup</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
