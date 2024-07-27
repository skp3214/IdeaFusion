import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import allService from '../appwrite/main.service';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await allService.getPost(id);
        setTitle(post.title);
        setContent(post.content);
        setStatus(post.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageUpload = async (file) => {
    try {
      const uploadedImage = await allService.uploadFile(file);
      return uploadedImage.$id; 
    } catch (err) {
      setError('Failed to upload image');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(''); // Clear any previous errors
    try {
      let imageUrl = null;
      if (featuredImage) {
        imageUrl = await handleImageUpload(featuredImage);
      }

      await allService.updatePost(id, {
        title,
        content,
        featuredImage: imageUrl, // Use imageUrl if an image was uploaded
        status,
      });
      
      navigate(`/myprofile`); // Navigate to the updated post view
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex py-12 justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-40 text-center text-3xl font-extrabold text-gray-900">Update Post</h2>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {updating ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4zm12.586-4.586a1 1 0 00-1.415 0L12 9.585l-1.586-1.586a1 1 0 00-1.415 1.415l2 2a1 1 0 001.415 0l2-2a1 1 0 000-1.415z"></path>
                    </svg>
                    Updating...
                  </div>
                ) : (
                  'Update Post'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
