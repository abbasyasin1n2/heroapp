import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import AppCard from '../components/AppCard';
import googleplaylogo from '../assets/googleplaylogo.png';
import appstorelogo from '../assets/appstorelogo.png';
import heroImage from '../assets/hero.png';

const Home = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/apps.json');
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const trendingApps = apps.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="bg-gray-200 py-16 px-4 pb-0">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-800 leading-tight">
            We Build <br />
            <span className="text-purple-600">Productive</span> Apps
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. Our goal is to turn your ideas into digital experiences that truly make an impact.
          </p>
          
          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://play.google.com/store/games?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn bg-gray-300 text-gray-800 border-none hover:bg-gray-400 flex items-center justify-center"
            >
              <img src={googleplaylogo} alt="Google Play" className="w-6 h-6 mr-2" />
              Google Play
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn bg-gray-300 text-gray-800 border-none hover:bg-gray-400 flex items-center justify-center"
            >
              <img src={appstorelogo} alt="App Store" className="w-6 h-6 mr-2" />
              App Store
            </a>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <img 
              src={heroImage} 
              alt="Mobile App Preview" 
              className="w-full max-w-md md:max-w-lg h-auto object-contain" 
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Trusted By Millions, Built For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">29.6M</div>
              <div className="text-xl font-semibold mb-1">Total Downloads</div>
              <div className="text-purple-200 text-sm">21% More Than Last Month</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">906K</div>
              <div className="text-xl font-semibold mb-1">Total Reviews</div>
              <div className="text-purple-200 text-sm">46% More Than Last Month</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">132+</div>
              <div className="text-xl font-semibold mb-1">Active Apps</div>
              <div className="text-purple-200 text-sm">31 More Will Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Apps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Apps</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore All Trending Apps on the Market developed by us
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {trendingApps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
              <div className="text-center">
                <Link to="/apps" className="btn btn-primary btn-lg">
                  Show All
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
