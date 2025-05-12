import React from 'react';
import { SearchIcon, BellIcon, UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export const Navbar = () => {
  const location = useLocation();
  return <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="font-bold text-xl">PokéTracker</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-lg ${location.pathname === '/' ? 'bg-red-700' : 'hover:bg-red-700'}`}>
              Accueil
            </Link>
            <Link to="/statistiques" className={`px-3 py-2 rounded-lg ${location.pathname === '/statistiques' ? 'bg-red-700' : 'hover:bg-red-700'}`}>
              Statistiques
            </Link>
            <Link to="/ajouter" className={`px-3 py-2 rounded-lg ${location.pathname === '/ajouter' ? 'bg-red-700' : 'hover:bg-red-700'}`}>
              Ajouter
            </Link>
          </div>
          <div className="hidden md:flex items-center bg-red-700 rounded-full px-3 py-1 flex-1 max-w-md mx-6">
            <SearchIcon size={18} className="text-red-200 mr-2" />
            <input type="text" placeholder="Rechercher dans votre collection..." className="bg-transparent border-none focus:outline-none text-white placeholder-red-200 w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-red-700">
              <BellIcon size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-red-700">
              <UserIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>;
};