import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AllPost from './components/AllPost';
import CreatePost from './components/PostForm';
import Header from './components/Header';
import PostDetails from './components/PostDetails';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute'; // Import the PublicRoute component
import UserPosts from './components/UserPosts';
import MyProfile from './components/MyProfile';
import UpdatePost from './components/UpdatePost';

const App = () => {
  return (
    <div className='bg-white'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/createpost" element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          } />
          <Route path="/allposts" element={<AllPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/userprofile/:id" element={<UserPosts />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/myprofile" element={
            <PrivateRoute>
              <MyProfile/>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
