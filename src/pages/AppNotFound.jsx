import { Link } from 'react-router';
import appErrorImage from '../assets/App-Error.png';

const AppNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <img 
            src={appErrorImage} 
            alt="App Not Found" 
            className="w-full max-w-md mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            OPPS!! APP NOT FOUND
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The app you're looking for doesn't exist in our collection.
          </p>
          <Link to="/apps" className="btn btn-primary btn-lg">
            Go Back!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppNotFound;

