import { Link } from 'react-router';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="HERO.IO" className="w-8 h-8 mr-2" />
              <span className="text-xl font-bold text-white">HERO.IO</span>
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-center mb-4 md:mb-0">
            <p className="text-white">
              Copyright © {new Date().getFullYear()} - All right reserved
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">Social Links</span>
            <div className="flex space-x-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
