import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const PreviewImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
`;

const BlogHeader = styled.h4`
  margin-top: 20px;
  color: #555;
`;

// Styled text area with increased height
const StyledTextarea = styled.textarea`
  height: 200px;
`;

// This component allows users to create a blog post
// It includes a form with fields for title, content, and image upload
const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');

  // Retrieve logged in user from localStorage (if available)
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // Handle file selection and generate preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl('');
    }
  };

  // Submit the blog post to the server
  // It sends a POST request with the blog data including title, content, and image file
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(
        'http://localhost:5000/api/create/blogs',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMessage('Blog created successfully!');
      setTitle('');
      setContent('');
      setImageFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error(error);
      setMessage('Error creating blog.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Blog</h2>
      {loggedInUser && (
        <BlogHeader>Welcome, {loggedInUser.firstName}!</BlogHeader>
      )}
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <StyledTextarea 
            className="form-control" 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input 
            type="file" 
            className="form-control" 
            onChange={handleFileChange} 
            accept="image/*"
            required 
          />
        </div>
        {previewUrl && (
          <div className="mt-3">
            <p>Image Preview:</p>
            <PreviewImage src={previewUrl} alt="Preview" />
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-3">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;


