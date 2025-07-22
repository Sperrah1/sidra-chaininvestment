import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';
import { FiUpload } from 'react-icons/fi';
import styles from '../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const response = await axios.post('/api/user/upload-profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSelectedFile(null);
      setUploading(false);
      setSuccessMessage('Profile picture updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <MobileMenu />
      <main className={styles.main}>
        <div className={styles.profileBox}>
          <h1 className={styles.profileTitle}>My Profile</h1>
          <div className={styles.profilePictureContainer}>
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className={styles.profileImage} />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
          </div>
          <h2 className={styles.username}>{user?.username}</h2>
          <p className={styles.email}>{user?.email}</p>

          <form onSubmit={handleUpload} className={styles.uploadForm}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <button
              type="submit"
              disabled={uploading}
              className={styles.uploadButton}
            >
              {uploading ? 'Uploading...' : <><FiUpload /> Upload</>}
            </button>
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
