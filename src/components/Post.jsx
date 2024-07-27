import React from 'react';
import allService from '../appwrite/main.service';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, update, deletePost }) => {
  const { title, featuredImage, $id, content, userId, username } = post;
  const navigate = useNavigate();

  return (
    <div className="w-full hover:border-2 rounded hover:border-teal-100 text-black hover:text-white hover:bg-teal-500 bg-white overflow-hidden cursor-pointer p-6">
      <div className="">
        {featuredImage && (
          <div className="w-full rounded aspect-[4/3] hover:border-2 bg-white hover:border-teal-100 overflow-hidden">
            <img
              src={allService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-fill"
            />
          </div>
        )}
        <div className="p-4 ">
          <h2 className="text-base text-wrap font-bold uppercase mb-4">{title}</h2>
          <p className="mb-4">{content.substring(0, 50)}...</p>
          <div onClick={() => navigate(`/post/${$id}`)} className="flex justify-center items-center">
            <button className="px-6 py-2 bg-black text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition duration-300">Read More</button>
          </div>
          <button onClick={() => navigate(`/userprofile/${userId}`)} className="w-full py-2 mt-4 bg-black text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition duration-300">{username}</button>
          {update && (
            <button onClick={()=>navigate(`/update/${$id}`)} className="w-full py-2 mt-4 bg-black text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition duration-300">Update</button>
          )}
          {deletePost && (
            <button onClick={() => deletePost($id)} className="w-full py-2 mt-4 bg-black text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition duration-300">Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
