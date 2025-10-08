import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'react-toastify';
import iconDownloads from '../assets/icon-downloads.png';
import iconRatings from '../assets/icon-ratings.png';
import iconReview from '../assets/icon-review.png';

// Helper function to get the correct image path
const getImageUrl = (imagePath) => {
  // Extract the filename from the path (e.g., "src/assets/appImages/ridmik.webp" -> "ridmik.webp")
  const filename = imagePath.split('/').pop();
  return new URL(`../assets/appImages/${filename}`, import.meta.url).href;
};

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);
        const response = await fetch('/apps.json');
        if (!response.ok) {
          throw new Error('Failed to fetch apps');
        }
        const data = await response.json();
        const foundApp = data.find(app => app.id === parseInt(id));
        setApp(foundApp);
      } catch (err) {
        console.error('Error fetching app:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  const handleInstall = () => {
    toast.success(`${app.title} (${app.size} MB) is being downloaded!`, {
      position: "top-right",
      autoClose: 3000,
    });
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

  if (!app) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">App Not Found</h2>
          <p className="text-gray-600 mb-6">The app you're looking for doesn't exist.</p>
          <a href="/apps" className="btn btn-primary">
            Browse All Apps
          </a>
        </div>
      </div>
    );
  }

  // Chart colors for each rating
  const barColors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* App Info Section */}
      <div className="bg-base-100 rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* App Image */}
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <img
              src={getImageUrl(app.image)}
              alt={app.title}
              className="w-48 h-48 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* App Details */}
          <div className="md:col-span-9">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{app.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{app.companyName}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <img src={iconDownloads} alt="Downloads" className="w-5 h-5" />
                  <span className="text-sm text-gray-600">Downloads</span>
                </div>
                <div className="text-2xl font-bold">{formatNumber(app.downloads)}</div>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <img src={iconRatings} alt="Rating" className="w-5 h-5" />
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
                <div className="text-2xl font-bold">{app.ratingAvg.toFixed(1)}</div>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <img src={iconReview} alt="Reviews" className="w-5 h-5" />
                  <span className="text-sm text-gray-600">Reviews</span>
                </div>
                <div className="text-2xl font-bold">{formatNumber(app.reviews)}</div>
              </div>
            </div>

            {/* Install Button */}
            <button
              onClick={handleInstall}
              className="btn btn-primary btn-lg w-full md:w-auto"
            >
              Install Now ({app.size} MB)
            </button>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="bg-base-100 rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ratings</h2>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={app.ratings}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {app.ratings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-base-100 rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{app.description}</p>
      </div>
    </div>
  );
};

export default AppDetails;

