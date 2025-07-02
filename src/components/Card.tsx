import { StarIcon, Trash2Icon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCollectionStore } from '../stores/collectionStore';
import { ConfirmModal } from './ConfirmModal';
import { EditCardModal } from './EditCardModal';

export const Card = ({ card, view, onDelete, onUpdate, }) => {
  const { fetchCollection } = useCollectionStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const profit = card.currentValue - card.purchasePrice;
  const profitPercentage = ((profit / card.purchasePrice) * 100).toFixed(1);
  const isProfitable = profit > 0;

  const getQualityColor = (quality) => {
    if (quality >= 9) return 'text-green-500';
    if (quality >= 7) return 'text-blue-500';
    if (quality >= 5) return 'text-yellow-500';
    if (quality >= 3) return 'text-orange-500';
    return 'text-red-500';
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`http://localhost:3000/api/collection/${card.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        onDelete(card.id);
        await fetchCollection();
        toast.success(`Carte "${card.name}" supprimée avec succès !`);
      } else {
        toast.error("Échec de la suppression de la carte.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
    } finally {
      setShowConfirm(false);
    }
  };

  const CardInfo = () => (
    <>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-800 dark:text-white">{card.name}</h3>
        <div className={`flex items-center ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
          {isProfitable ? <TrendingUpIcon size={16} /> : <TrendingDownIcon size={16} />}
          <span className="ml-1 text-sm font-medium">{profitPercentage}%</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.edition}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-100 dark:bg-dark-300 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">Achat</p>
          <p className="font-semibold text-gray-800 dark:text-white">{card.purchasePrice} €</p>
        </div>
        <div className="bg-gray-100 dark:bg-dark-300 p-2 rounded">
          <p className="text-gray-500 dark:text-gray-400">Actuel</p>
          <p className="font-semibold text-gray-800 dark:text-white">{card.currentValue} €</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Profit/Perte</span>
          <span className={isProfitable ? 'text-green-600' : 'text-red-600'}>
            {isProfitable ? '+' : ''}{profit} €
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-dark-300 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${isProfitable ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min(Math.abs(parseInt(profitPercentage)), 100)}%` }}
          />
        </div>
      </div>
    </>
  );

  const QualityBadge = () => (
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold dark:bg-dark-200 flex items-center gap-1">
      <StarIcon size={12} className={getQualityColor(card.quality)} />
      <span className={getQualityColor(card.quality)}>{card.quality}/10</span>
    </div>
  );

  return (
    <>
      {view === 'grid' ? (
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all hover:border-blue-200 dark:bg-dark-200 dark:border-dark-300">
          <div className="relative pt-[56.25%] bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden dark:from-dark-300 dark:to-dark-200">
            <img src={card.image} alt={card.name} className="absolute top-0 left-0 w-full h-full object-contain p-2 sm:p-4 transform hover:scale-105 transition-transform" />
            <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 dark:bg-dark-200 dark:text-gray-300">
              {card.rarity}
            </div>
            <QualityBadge />
          </div>
          <div className="p-4">
            <CardInfo />
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row bg-gray-50 dark:bg-dark-200 rounded-xl overflow-hidden border border-gray-100 dark:border-dark-300 hover:shadow-md transition-all hover:border-blue-200">
          <div className="sm:w-24 md:w-32 h-24 relative bg-gradient-to-br from-blue-50 to-gray-100 dark:from-dark-300 dark:to-dark-200">
            <img src={card.image} alt={card.name} className="absolute top-0 left-0 w-full h-full object-contain p-1" />
            <QualityBadge />
          </div>
          <div className="p-2 sm:p-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between flex-wrap">
            <div>
              <h3 className="font-semibold text-sm sm:text-base sm:font-bold text-gray-800 dark:text-white">{card.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.edition}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.rarity}</p>
            </div>
            <div className="flex mt-3 sm:mt-0 space-x-3 sm:space-x-6 items-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Achat</p>
                <p className="font-semibold sm:text-base text-sm text-gray-800 dark:text-white">{card.purchasePrice} €</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Actuel</p>
                <p className="font-semibold sm:text-base text-sm text-gray-800 dark:text-white">{card.currentValue} €</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Profit/Perte</p>
                <p className={`font-semibold sm:text-base text-sm ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                  {isProfitable ? '+' : ''}{profit} € ({profitPercentage}%)
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <button onClick={() => setIsEditOpen(true)} className="bg-white dark:bg-dark-300 rounded-full p-1 hover:bg-blue-100 dark:hover:bg-blue-900" title="Modifier">
                  ✏️
                </button>
                <button onClick={() => setShowConfirm(true)} className="bg-white dark:bg-dark-300 rounded-full p-1 hover:bg-red-100 dark:hover:bg-red-900" title="Supprimer">
                  <Trash2Icon size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <>
        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
          title={`Supprimer "${card.name}" ?`}
          message="Êtes-vous sûr de vouloir supprimer cette carte ? Cette action est irréversible."
        />
        <EditCardModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          card={card}
          onUpdate={onUpdate}
        />
      </>
    </>
  );
};
