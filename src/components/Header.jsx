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
        <Link to="/" className="btn btn-ghost text-lg md:text-xl">
          <img src={logo} alt="HERO.IO" className="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2" />
          <span 
            className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-bold"
          >
            HERO.IO
          </span>
        </Link>
      </div>
      
      <div className="flex-1 flex justify-center">
        <ul className="menu menu-horizontal px-0 md:px-1 gap-1">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-1 md:gap-2 px-2 md:px-4 ${isActive ? 'text-primary' : ''}`
              }
            >
              <IoHomeOutline className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline text-sm md:text-base">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/apps" 
              className={({ isActive }) => 
                `flex items-center gap-1 md:gap-2 px-2 md:px-4 ${isActive ? 'text-primary' : ''}`
              }
            >
              <FaAppStore className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline text-sm md:text-base">Apps</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/installation" 
              className={({ isActive }) => 
                `flex items-center gap-1 md:gap-2 px-2 md:px-4 ${isActive ? 'text-primary' : ''}`
              }
            >
              <MdInstallDesktop className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline text-sm md:text-base">Install</span>
            </NavLink>
          </li>
        </ul>
      </div>
      
      <div className="flex-1 flex justify-end">
        <a 
          href="https://github.com/abbasyasin1n2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-sm md:btn-md text-white border-none px-2 md:px-4"
          style={{ background: 'linear-gradient(to right, #632EE3, #9F62F2)' }}
        >
          <img src={githublogo} alt="GitHub" className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
          <span className="hidden md:inline">Contribute</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
