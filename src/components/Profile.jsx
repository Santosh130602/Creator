import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const backendURL = 'http://localhost:4000'; 
const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    fatherName: '',
    address: '',
  });
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(null); 
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;

  console.log('userId', userId);

  useEffect(() => {
    if (!userId) {
      navigate('/login'); 
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (!userId) return; 
    
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${backendURL}/api/profile/prof/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await res.json();
        setProfile({
          fullName: data.user.fullName,
          phone: data.user.phone,
          fatherName: data.user.fatherName,
          address: data.user.address,
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to load profile data');
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch(`${backendURL}/api/profile/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: profile.fullName,
          phone: profile.phone,
          fatherName: profile.fatherName,
          address: profile.address,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to update profile');
      }
  
      const data = await res.json();
      setMessage(`Profile updated successfully! Your new credits: ${data.credits}`);
      setProfile({
        fullName: data.user.fullName,
        phone: data.user.phone,
        fatherName: data.user.fatherName,
        address: data.user.address,
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">Update Your Profile</h2>

      {message && (
        <div className="mb-4 text-center text-gray-700">
          <p>{message}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={profile.fatherName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-md p-2 focus:ring focus:border-blue-400"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
