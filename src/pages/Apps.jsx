import { useState, useEffect } from 'react';
import AppCard from '../components/AppCard';

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const response = await fetch('/apps.json');
        if (!response.ok) {
          throw new Error('Failed to fetch apps');
        }
        const data = await response.json();
        setApps(data);
        setFilteredApps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  // Debounced search functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredApps(apps);
      } else {
        const filtered = apps.filter(app =>
          app.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredApps(filtered);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, apps]);

  const handleShowAll = () => {
    setSearchQuery('');
    setFilteredApps(apps);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our All Applications</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore All Apps on the Market developed by us
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="text-lg font-semibold">
          ({filteredApps.length}) Apps Found
        </div>
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="search Apps"
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* App Grid */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-600 mb-6">No apps found</p>
          <button onClick={handleShowAll} className="btn btn-primary">
            Show All Apps
          </button>
        </div>
      )}
    </div>
  );
};

export default Apps;
