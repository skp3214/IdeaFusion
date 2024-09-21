import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import allService from '../appwrite/main.service';
import Post from './Post';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams(); // Get the id from URL params

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true); // Set loading to true when starting fetch
        const userId = id; // Use URL param id or logged-in userId

        if (userId) {
          const result = await allService.getPostsByUserId(userId);
          const userPosts = result.documents;
          setPosts(userPosts);
          setUser(userPosts[0]?.username || 'Unknown'); // Handle empty userPosts array
        }
      } catch (err) {
        console.error('Error fetching user posts:', err);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUserAndPosts();
  }, [id, userData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin border-t-2 border-teal-500 border-solid rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-cover border-b-4 w-full border-black bg-white bg-center pt-24 md:py-32 px-4 md:px-8 mx-auto">
        <div className="container mx-auto text-center text-gray-900">
          <h2 className="text-4xl md:text-7xl text-left font-semibold mb-4">
            Welcome To
          </h2>
          {user && (
            <h1 className="mb-4 text-5xl md:text-8xl pb-2 font-serif bg-gradient-to-l from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent text-left">
              {user} Blogs.
            </h1>
          )}
          <h3 className="text-3xl md:text-6xl text-left my-6 mb-8">
            <span className='mx-2 font-bold font-sans'>Click.</span>
            <span className='mx-2 font-bold font-serif text-teal-500'>Read.</span>
          </h3>
        </div>
      </section>
      <section className="py-10 bg-white px-4">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.$id}>
                <Post post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPosts;
