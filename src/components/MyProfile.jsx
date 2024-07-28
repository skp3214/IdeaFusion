import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import allService from '../appwrite/main.service';
import Post from './Post';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const userId = userData.$id;

        if (userId) {
          const result = await allService.getPostsByUserId(userId);
          const userPosts = result.documents;
          setPosts(userPosts);
        }
      } catch (err) {
        console.log(err.message); // Set error message if there is an error
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchUserAndPosts();
  }, [userData]);

  const handleDeletePost = async (postId) => {
    try {
      await allService.deletePost(postId);
      setPosts(posts.filter(post => post.$id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin border-t-4 border-teal-500 border-solid rounded-full w-12 h-12"></div>
      </div>
    );
  }


  return (
    <div>
      <div>
        <section className="bg-cover border-b-4 w-[96%] border-black bg-white bg-center py-32 px-8 mx-auto">
          <div className="container mx-auto text-center text-gray-900">
            <h2 className="text-7xl text-left font-semibold mb-4">
              Welcome To
            </h2>

            <h1 className="mb-4 text-8xl pb-2 font-serif bg-gradient-to-l from-teal-400 via-cyan-900 to-red-500 bg-clip-text text-transparent text-left">
              Your Blogs.
            </h1>

            <h3 className="text-6xl text-left my-6 mb-8">
              <span className='mx-2 font-bold font-sans'>Click.</span>
              <span className='mx-2 font-bold font-serif text-teal-500'>Change</span>
            </h3>
            <button className="bg-teal-500 hover:bg-teal-800 text-white font-bold py-3 px-6 rounded"
              onClick={() => { navigate('/createpost') }}
            >
              Share Your Views
            </button>
          </div>
        </section>
      </div>
      <div>
        <section className="py-10 bg-white px-4">
          <div className="container mx-auto text-center">
            <div className="py-10 bg-gray-100 px-4">
              <div className="container mx-auto text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div key={post.$id} className="p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <Post post={post} update={true} deletePost={handleDeletePost} />
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center min-h-[300px] bg-white rounded-lg shadow-lg">
                      <h1 className="text-xl font-semibold text-gray-600">No Posts Yet</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
