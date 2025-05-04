import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const backendURL = 'https://creator-vr5k.onrender.com'; 

const FeedAggregator = () => {
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No user token found');
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (err) {
      alert('Invalid token');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      const redditRes = await fetch('https://www.reddit.com/r/popular.json');
      const redditData = await redditRes.json();

      const redditPosts = redditData.data.children.slice(0, 10).map(post => ({
        id: `reddit-${post.data.id}`,
        title: post.data.title,
        content: post.data.selftext || 'Click to read more on Reddit',
        source: 'Reddit',
        url: `https://reddit.com${post.data.permalink}`,
      }));

      const simulatedPosts = Array.from({ length: 5 }, (_, i) => ({
        id: `linkedin-${i}`,
        title: `Simulated LinkedIn Post #${i + 1}`,
        content: `Professional tip of the day ${i + 1}: Keep learning.`,
        source: 'LinkedIn',
        url: 'https://linkedin.com',
      }));

      setPosts([...redditPosts, ...simulatedPosts]);
    };

    const fetchUserPoints = async () => {
      const res = await fetch(`${backendURL}/api/credits/credits/${userId}`);
      const data = await res.json();
      setPoints(data.credits);
    };

    fetchPosts();
    fetchUserPoints();
  }, [userId]);

  // Update points by a certain delta (positive or negative)
  const updatePoints = async (delta) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/credits/points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, delta }),
      });
      const data = await res.json();
      setPoints(data.credits);
    } catch (error) {
      alert('Failed to update points.');
    } finally {
      setLoading(false);
    }
  };

  const savePost = (post) => {
    if (!savedPosts.some(p => p.id === post.id)) {
      setSavedPosts(prev => [...prev, post]);
      updatePoints(5);
    }
  };

  const sharePost = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Post link copied!');
      updatePoints(5);
    } catch {
      alert('Failed to copy link.');
    }
  };

  const reportPost = (id) => {
    if (!reportedPosts.includes(id)) {
      setReportedPosts(prev => [...prev, id]);
      updatePoints(-10);
      alert('Reported. Thank you!');
    }
  };

  const isReported = id => reportedPosts.includes(id);
  const isSaved = id => savedPosts.some(p => p.id === id);

  const rewardUserDaily = async (userId) => {
    try {
      const res = await fetch(`${backendURL}/api/credits/reward-daily`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.rewarded) {
        alert('🎉 Daily login reward received!');
        setPoints(data.credits);
      } else {
        console.log('User already received reward today.');
      }
    } catch (err) {
      console.error('Error rewarding daily visit:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      rewardUserDaily(userId);
    }
  }, [userId]);

  if (!userId) return <div className="p-6 text-center">Loading user...</div>;

  return (
    <div className="min-h-screen py-6 px-4 flex flex-col items-center bg-gray-50">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h1 className="text-2xl font-bold">📢 Feed Aggregator</h1>
          <div className="text-green-700 font-semibold">
            {loading ? 'Updating...' : `Points: ${points}`}
          </div>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {posts.map(post => (
            <div
              key={post.id}
              className={`border p-4 rounded-md ${isReported(post.id) ? 'opacity-40' : 'bg-gray-100'} transition`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{post.title}</h2>
                <span className="text-sm text-blue-600">{post.source}</span>
              </div>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{post.content}</p>

              <div className="mt-4 flex gap-3 text-sm">
                {!isSaved(post.id) && (
                  <button
                    onClick={() => savePost(post)}
                    disabled={loading}
                    className={`px-3 py-1 rounded text-white transition ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => sharePost(post.url)}
                  disabled={loading}
                  className={`px-3 py-1 rounded text-white transition ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  Share
                </button>
                <button
                  onClick={() => reportPost(post.id)}
                  disabled={loading}
                  className={`px-3 py-1 rounded text-white transition ${loading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedAggregator;
