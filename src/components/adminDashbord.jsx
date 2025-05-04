import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = 'https://creator-vr5k.onrender.com';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPoints, setNewPoints] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendURL}/api/auth/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle points update
  const handleUpdatePoints = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${backendURL}/api/auth/change-point/${userId}`,
        { credits: newPoints[userId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const updatedUser = res.data.user;
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? updatedUser : user))
        );
        setEditingId(null); 
      } else {
        throw new Error('Failed to update points');
      }
    } catch (err) {
      setError('Error updating points');
      console.error('Error updating points:', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">User List</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Points</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {editingId === user._id ? (
                  <input
                    type="number"
                    value={newPoints[user._id] || ''}
                    onChange={(e) =>
                      setNewPoints({ ...newPoints, [user._id]: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-20"
                  />
                ) : (
                  user.credits
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === user._id ? (
                  <>
                    <button
                      onClick={() => handleUpdatePoints(user._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-red-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingId(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit Points
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
