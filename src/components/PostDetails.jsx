import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import allService from '../appwrite/main.service';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await allService.getPost(id);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-600">
        <div className="animate-spin border-t-4 border-white border-solid rounded-full w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-300 to-red-600">
        <div className="text-red-700 text-3xl font-bold">
          Oops! Something went wrong: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 md:px-2 py-10">
      <div className="bg-white p-6 rounded-lg shadow-xl border flex flex-col md:flex-row border-gray-300">
        {post.featuredImage && (
          <img
            className="w-full md:w-1/2 h-auto object-cover rounded-lg mb-6 shadow-lg transition-transform transform hover:scale-105"
            src={allService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        )}
        <div className="flex-1 mx-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-xl text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
