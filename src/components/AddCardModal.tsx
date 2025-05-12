import { X } from 'lucide-react';
export const AddCardModal = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-200 rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Ajouter une carte
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom de la carte
            </label>
            <input type="text" className="w-full p-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-100 dark:text-white" placeholder="Ex: Dracaufeu" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Édition
            </label>
            <input type="text" className="w-full p-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-100 dark:text-white" placeholder="Ex: Set de Base - Holo 1ère Édition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prix d'achat (€)
            </label>
            <input type="number" className="w-full p-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-100 dark:text-white" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input type="url" className="w-full p-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-100 dark:text-white" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Qualité (1-10)
            </label>
            <div className="flex items-center gap-2">
              <input type="range" min="1" max="10" step="1" defaultValue="5" className="flex-1" />
              <input type="number" min="1" max="10" defaultValue="5" className="w-16 p-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-100 dark:text-white" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Ajouter
          </button>
        </form>
      </div>
    </div>;
};