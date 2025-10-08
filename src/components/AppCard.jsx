import { Link } from 'react-router';
import { FaDownload } from 'react-icons/fa';

// Helper function to get the correct image path
const getImageUrl = (imagePath) => {
  // Extract the filename from the path (e.g., "src/assets/appImages/ridmik.webp" -> "ridmik.webp")
  const filename = imagePath.split('/').pop();
  return new URL(`../assets/appImages/${filename}`, import.meta.url).href;
};

const AppCard = ({ app }) => {
  return (
    <Link to={`/apps/${app.id}`} className="group">
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <figure className="px-4 pt-4">
          <img 
            src={getImageUrl(app.image)} 
            alt={app.title}
            className="w-full h-32 object-cover rounded-lg"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-sm font-semibold line-clamp-2 mb-2">
            {app.title}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-green-600">
              <FaDownload className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">
                {app.downloads >= 1000000 
                  ? `${(app.downloads / 1000000).toFixed(1)}M`
                  : app.downloads >= 1000 
                    ? `${(app.downloads / 1000).toFixed(0)}K`
                    : app.downloads
                }
              </span>
            </div>
            <div className="flex items-center text-orange-500">
              <span className="text-xs font-medium">★</span>
              <span className="text-xs font-medium ml-1">
                {app.ratingAvg.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
