import React, { useEffect, useState } from 'react';
import allService from '../appwrite/main.service';
import Post from './Post';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true when starting to fetch posts
      try {
        const result = await allService.getPosts();
        setPosts(result.documents.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin border-t-4 border-teal-500 border-solid rounded-full w-12 h-12"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-10 flex flex-col">
      <main className="flex-grow container mx-auto px-4">
        <section className="bg-cover border-b-4 w-[97%] border-black bg-white bg-center p-20 px-8 mx-auto">
          <div className="container mx-auto text-center text-gray-900">
            <h1 className="mb-4 text-7xl font-serif bg-gradient-to-l from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent text-left">Explore a World of Ideas</h1>
            <h2 className="text-8xl text-left font-semibold mb-4">Discover All Our Posts in One Place!</h2>
            <h3 className="text-6xl text-left my-6 mb-4">
              <span className='mx-2 bg-gradient-to-l from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent font-bold font-sans'>Click.</span>
              <span className='mx-2 font-bold font-serif text-teal-500'>Read.</span>
            </h3>
          </div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {posts && posts.map((post) => (
            <Post key={post.$id} post={post} />
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; 2024 My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AllPosts;
