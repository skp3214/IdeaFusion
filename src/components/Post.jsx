import React from 'react';
import allService from '../appwrite/main.service';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, update, deletePost }) => {
  const { title, featuredImage, $id, content, userId, username } = post;
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden my-4"> 
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            className="h-10 w-10 rounded-full cursor-pointer mr-2"
            src={`https://ui-avatars.com/api/?name=${username}&background=random`}
            alt={username}
            onClick={() => navigate(`/userprofile/${userId}`)}
          />
          <div>
            <p className="font-semibold text-gray-900 cursor-pointer" onClick={() => navigate(`/userprofile/${userId}`)}>{username}</p>
            <p className="text-sm text-gray-500 cursor-pointer" onClick={() => navigate(`/userprofile/${userId}`)}>@{username.toLowerCase()}</p>
          </div>
        </div>
        {featuredImage && (
          <img
            src={allService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-auto object-contain rounded-lg mb-4" 
          />
        )}
        <p className="text-gray-700 mb-4">{content.substring(0, 60)}...</p>
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate(`/post/${$id}`)}
            className="text-blue-500 hover:underline"
          >
            Read More
          </button>
          {update && (
            <button 
              onClick={() => navigate(`/update/${$id}`)}
              className="text-gray-500 hover:text-gray-700"
            >
              Edit
            </button>
          )}
          {deletePost && (
            <button 
              onClick={() => deletePost($id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
