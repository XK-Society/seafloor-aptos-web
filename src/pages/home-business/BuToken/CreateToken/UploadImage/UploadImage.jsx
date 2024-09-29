import React, { useState } from 'react';
import './UploadImage.css';
import { Link } from 'react-router-dom';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create a URL to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload (mock functionality)
  const handleImageUpload = () => {
    if (selectedImage) {
      // Perform upload action here
      console.log('Image uploaded:', selectedImage.name);
      alert('Image uploaded successfully!');
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div className="upload" >
        <h2>Upload Image</h2>
    <div className="upload-container">
      <div className="image-preview">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Image Preview" />
        ) : (
          <p>No image selected</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input"
      />
      <button onClick={handleImageUpload} className="upload-button">
        Upload Image
      </button>
    </div>
    <Link to="/token-desc">
    <button className="next-button">
        Next
      </button>
    </Link>
    
    </div>
  );
};

export default UploadImage;
