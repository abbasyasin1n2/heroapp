import { Link } from 'react-router';
import logo from '../assets/logo.png';
import facebooklogo from '../assets/facebooklogo.png';
import linkedinlogo from '../assets/linkedinlogo.png';
import twitterlogo from '../assets/twitterlogo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0B1437] text-base-content py-8">
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
                className="hover:opacity-80 transition-opacity"
              >
                <img src={twitterlogo} alt="Twitter" className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src={linkedinlogo} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src={facebooklogo} alt="Facebook" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
