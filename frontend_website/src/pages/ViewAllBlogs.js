import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components for the blog page
const StyledImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const CloseButton = styled.button`
  margin-top: 10px;
`;

// This component allows users to view all blogs
// It fetches the blogs from the server and displays them in a list
// Each blog includes a title, content, and an image (if available)
// Users can delete their own blogs if they are logged in
const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Get logged in user from localStorage (if any)
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view/blogs');
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle delete blog action
  // It sends a DELETE request to the server with the blog ID
  // If the request is successful, the blog is removed from the list
  const handleDelete = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/create/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mt-4">
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="card mb-3">
            {blog.image && (
              <StyledImage 
                src={`http://localhost:5000/${blog.image}`}
                alt={blog.title}
                onClick={() => handleImageClick(`http://localhost:5000/${blog.image}`)}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.content}</p>
              <p className="card-text">
                <small className="text-muted">By {blog.userEmail}</small>
              </p>
              {loggedInUser && loggedInUser.email === blog.userEmail && (
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {selectedImage && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              style={{ width: '100%', height: '500px' }}
            />
            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ViewBlogs;


