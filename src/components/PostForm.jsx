import React, { useState } from 'react';
import allService from '../appwrite/main.service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userData ? userData.$id : ''; // Replace with actual user ID
    const username = userData ? userData.name : '';

    setLoading(true); // Set loading to true when starting to create a post

    try {
      let imageId = null;
      if (featuredImage) {
        const uploadedFile = await allService.uploadFile(featuredImage);
        if (uploadedFile) {
          imageId = uploadedFile.$id;
        }
      }

      const newPost = await allService.createPost({
        title,
        content,
        featuredImage: imageId,
        status,
        userId,
        username
      });

      if (newPost) {
        console.log('Post created successfully:', newPost);
        setContent('');
        setTitle('');
        setFeaturedImage(null);
        setStatus('active');
        navigate('/allposts');
      }
    } catch (error) {
      setError(error.message); // Set error message if there is an error
      console.error('Error creating post:', error);
    } finally {
      setLoading(false); // Set loading to false after the process is done
    }
  };

  return (
    <div className="min-h-screen flex py-12 justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-40 text-center text-3xl font-extrabold text-gray-900">Create a New Post</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content" className="sr-only">Content</label>
              <textarea
                id="content"
                name="content"
                rows="5"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="featuredImage" className="sr-only">Featured Image</label>
              <input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={(e) => setFeaturedImage(e.target.files[0])}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="status" className="sr-only">Status</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin border-t-4 border-teal-500 border-solid rounded-full w-12 h-12"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-4">
              <p>{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              {/* Additional message display */}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-teal-300' : 'bg-teal-500'} hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
