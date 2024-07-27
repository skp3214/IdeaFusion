import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import allService from '../appwrite/main.service';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await allService.getPosts();
        setPosts(result.documents);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  const latestPosts =posts.length<3?posts: posts.slice(posts.length-3, posts.length);

  const handleNavigate = () => {
    navigate('/allposts');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow  ">
        <section className="bg-cover border-b-4 w-[96%] border-black bg-white bg-center py-32 px-8 mx-auto" >
          <div className="container mx-auto text-center text-gray-900">
            <h1 className=" mb-4 text-9xl font-serif bg-gradient-to-l from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent text-left">IDEA FUSION</h1>
            <h2 className="text-9xl text-left  font-semibold mb-4">Blogs.</h2>
            <h3 className="text-6xl text-left my-6 mb-8"><span className='mx-2 font-bold font-sans'>Click.</span><span className='mx-2 font-bold font-serif text-teal-500'>Read.</span><span className='mx-2 italic font-mono text-teal-400 font-thin'>Post</span></h3>
            <button className="bg-teal-500 hover:bg-teal-800 text-white font-bold py-3 px-6 rounded"
            onClick={()=>{navigate('/createpost')}}
            >
              Share Your Views
            </button>
          </div>
        </section>

        <section className="py-10 bg-white px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-6xl pb-4 px-8 mb-6 text-left">Our Recent Blogs</h3>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Post key={post.$id} post={post} />
              ))}
            </div>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded mt-8"
              onClick={handleNavigate}
            >
              View All Posts
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; 2024 My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
