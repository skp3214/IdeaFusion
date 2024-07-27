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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-xl font-semibold">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 md:px-8 py-12">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
          {post.featuredImage && (
            <img
              className="w-full h-auto object-cover rounded-lg mb-6 shadow-md"
              src={allService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          )}
          <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
