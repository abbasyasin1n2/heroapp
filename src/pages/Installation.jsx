import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { getStoredApps, removeApp } from '../utils/localStorage';

// Helper function to get the correct image path
const getImageUrl = (imagePath) => {
  const filename = imagePath.split('/').pop();
  return new URL(`../assets/appImages/${filename}`, import.meta.url).href;
};

const Installation = () => {
  const [allApps, setAllApps] = useState([]);
  const [installedApps, setInstalledApps] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstalledApps = async () => {
      try {
        setLoading(true);
        // Fetch all apps from JSON
        const response = await fetch('/apps.json');
        if (!response.ok) {
          throw new Error('Failed to fetch apps');
        }
        const data = await response.json();
        setAllApps(data);
        
        // Get installed app IDs from localStorage
        const installedIds = getStoredApps();
        
        // Filter to get only installed apps
        const installed = data.filter(app => installedIds.includes(app.id));
        setInstalledApps(installed);
      } catch (err) {
        console.error('Error fetching apps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstalledApps();
  }, []);

  const handleUninstall = (appId, appTitle) => {
    const success = removeApp(appId);
    if (success) {
      // Update UI by removing the app
      setInstalledApps(prev => prev.filter(app => app.id !== appId));
      toast.success(`${appTitle} has been uninstalled.`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    
    let sortedApps = [...installedApps];
    if (order === 'high-low') {
      sortedApps.sort((a, b) => b.downloads - a.downloads);
    } else if (order === 'low-high') {
      sortedApps.sort((a, b) => a.downloads - b.downloads);
    }
    setInstalledApps(sortedApps);
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Installed Apps</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      {/* Count and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="text-lg font-semibold">
          {installedApps.length} Apps Found
        </div>
        <div className="relative">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="select select-bordered w-full md:w-64"
          >
            <option value="default">Sort By Downloads</option>
            <option value="high-low">High-Low</option>
            <option value="low-high">Low-High</option>
          </select>
        </div>
      </div>

      {/* Installed Apps List */}
      {installedApps.length > 0 ? (
        <div className="space-y-4">
          {installedApps.map((app) => (
            <div
              key={app.id}
              className="bg-base-100 shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              {/* App Image */}
              <Link to={`/apps/${app.id}`} className="flex-shrink-0">
                <img
                  src={getImageUrl(app.image)}
                  alt={app.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </Link>

              {/* App Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/apps/${app.id}`}>
                  <h3 className="text-lg font-semibold mb-2 hover:text-primary">
                    {app.title}
                  </h3>
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <span className="text-lg">↓</span>
                    <span className="font-medium">{formatNumber(app.downloads)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <span className="text-lg">★</span>
                    <span className="font-medium">{app.ratingAvg.toFixed(1)}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">{app.size} MB</span>
                  </div>
                </div>
              </div>

              {/* Uninstall Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleUninstall(app.id, app.title)}
                  className="btn btn-success text-white"
                >
                  Uninstall
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-600 mb-6">No apps installed yet</p>
          <Link to="/apps" className="btn btn-primary">
            Browse Apps
          </Link>
        </div>
      )}
    </div>
  );
};

export default Installation;
