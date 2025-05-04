import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
const backendURL = 'http://localhost:4000'; 

const PointsContent = () => {
  const [points, setPoints] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const userId = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).id : null;

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchUserPoints = async () => {
      try {
        const res = await fetch(`${backendURL}/api/credits/credits/${userId}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch points');
        }

        const data = await res.json();
        setPoints(data.credits); 
      } catch (err) {
        console.error('Error fetching user points:', err);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUserPoints();
  }, [navigate, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
      </div>
    ); 
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p className="text-xl">{error}</p>
      </div>
    ); 
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">Your Points</h2>
        <p className="text-xl text-center text-gray-800">
          You currently have <span className="font-bold text-blue-600">{points}</span> points.
        </p>
      </div>
    </div>
  );
};

export default PointsContent;
