import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BarChartIcon, PlusCircleIcon, UserIcon, SunIcon, MoonIcon, LogOutIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // On utilise useNavigate pour la redirection
  const {
    isDark,
    toggleTheme
  } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Supprimer le token lors de la déconnexion
    localStorage.removeItem('authToken');
    // Rediriger vers la page de connexion après la déconnexion
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300 flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 border-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-white">
            PokéTracker
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
              <HomeIcon size={20} />
              <span>Accueil</span>
            </Link>
          </li>
          <li>
            <Link to="/statistiques" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/statistiques') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
              <BarChartIcon size={20} />
              <span>Statistiques</span>
            </Link>
          </li>
          <li>
            <Link to="/ajouter" className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${isActive('/ajouter') ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'}`}>
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
        <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 mt-2">
          <LogOutIcon size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};
