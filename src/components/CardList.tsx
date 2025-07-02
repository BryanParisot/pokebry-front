import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useRarityStore } from '../stores/useRarityStore';
import { useCollectionStore } from '../stores/collectionStore';
import { Card } from './Card';

export const CardList = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const user = useAuthStore((state) => state.user);
  const { rarities, fetchRarities } = useRarityStore();
  const { collection: cards, fetchCollection, deleteCard } = useCollectionStore();

  const userId = user?.id;
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const handleDeleteCard = (cardId: number) => {
    // Tu peux ajouter un appel API ici si tu veux supprimer côté backend aussi
    deleteCard(cardId);
  };

  useEffect(() => {
    if (!userId || !token) return;

    if (rarities.length === 0) {
      fetchRarities();
    }

    fetchCollection();
  }, [userId, token]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
          Votre collection
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              className={`px-3 py-1.5 ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setView('grid')}
            >
              Grid
            </button>
            <button
              className={`px-3 py-1.5 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {cards.length === 0 ? (
        <p>Aucun objet dans votre collection.</p>
      ) : (
        <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {cards.map(card => (
            <Card
              key={card.id}
              card={{
                id: card.id,
                name: card.name,
                edition: card.edition,
                purchasePrice: card.purchase_price,
                currentValue: card.estimated_value,
                image: card.image_url,
                rarity: card.rarity,
                quality: card.quality,
                item_type: card.item_type
              }}
              view={view}
              onDelete={() => handleDeleteCard(card.id)}
              onUpdate={fetchCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
};
