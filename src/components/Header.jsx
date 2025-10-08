import { Link, NavLink } from 'react-router';
import { IoHomeOutline } from 'react-icons/io5';
import { FaAppStore, FaGithub } from 'react-icons/fa';
import { MdInstallDesktop } from 'react-icons/md';
import logo from '../assets/logo.png';
import githublogo from '../assets/githublogo.png';

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="HERO.IO" className="w-8 h-8 mr-2" />
          HERO.IO
        </Link>
      </div>
      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 ${isActive ? 'text-primary' : ''}`
              }
            >
              <IoHomeOutline className="w-4 h-4" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/apps" 
              className={({ isActive }) => 
                `flex items-center gap-2 ${isActive ? 'text-primary' : ''}`
              }
            >
              <FaAppStore className="w-4 h-4" />
              Apps
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/installation" 
              className={({ isActive }) => 
                `flex items-center gap-2 ${isActive ? 'text-primary' : ''}`
              }
            >
              <MdInstallDesktop className="w-4 h-4" />
              Installation
            </NavLink>
          </li>
        </ul>
      </div>
      
      <div className="flex-none ml-4">
        <a 
          href="https://github.com/abbasyasin1n2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <img src={githublogo} alt="GitHub" className="w-4 h-4 mr-2" />
          Contribute
        </a>
      </div>
    </div>
  );
};

export default Header;
