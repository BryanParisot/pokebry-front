import {
  BarChartIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  PlusCircleIcon,
  SunIcon,
  UserIcon,
  XIcon
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="md:hidden p-3 flex justify-between items-center bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-dark-300">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon size={24} className="text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Sidebar Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed flex flex-col md:static top-0 left-0 z-50 w-64 h-full bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 flex justify-between items-center md:block">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 border-red-600">
                <div className="w-3 h-3 bg-red-600 rounded-full" />
              </div>
            </div>
            <span className="font-bold text-xl text-gray-800 dark:text-white">PokéTracker</span>
          </Link>
          {/* Close button (mobile only) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <XIcon size={24} className="text-gray-600 dark:text-white" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
                <HomeIcon size={20} />
                <span>Accueil</span>
              </Link>
            </li>
            <li>
              <Link to="/statistiques" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/statistiques') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
                <BarChartIcon size={20} />
                <span>Statistiques</span>
              </Link>
            </li>
            <li>
              <Link to="/profilepage" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/profilepage') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
                <UserIcon size={20} />
                <span>Profil</span>
              </Link>
            </li>
            <li>
              <Link to="/ajouter" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/ajouter') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
                <PlusCircleIcon size={20} />
                <span>Ajouter</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-dark-300">
          <button onClick={toggleTheme} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 w-full">
            {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            <span>{isDark ? 'Mode clair' : 'Mode sombre'}</span>
          </button>
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 mt-2 w-full">
            <LogOutIcon size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </>
  );
};
