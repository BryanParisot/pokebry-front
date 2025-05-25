import { ChevronDownIcon, FilterIcon, SlidersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useRarityStore } from '../stores/useRarityStore';
import { Card } from './Card';



export const CardList = () => {
  const [view, setView] = useState('grid');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const { rarities, fetchRarities } = useRarityStore();


  const userId = user?.id
  const token = localStorage.getItem('authToken');

  const handleDeleteCard = (cardId: number) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  useEffect(() => {

    if (rarities.length === 0) {
      fetchRarities();
    }
    const fetchCards = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/collection/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setCards(data.collection || []);
      } catch (err) {
        console.error('Erreur de chargement des cartes :', err);
      } finally {
        setLoading(false);
        console.log(token)
      }
    };

    fetchCards();
  }, [userId, token]);



  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
          Votre collection
        </h2>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
            <FilterIcon size={16} className="mr-1" />
            Filter
          </button>
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
            <SlidersIcon size={16} className="mr-1" />
            Sort
            <ChevronDownIcon size={16} className="ml-1" />
          </button>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button className={`px-3 py-1.5 ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setView('grid')}>
              Grid
            </button>
            <button className={`px-3 py-1.5 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setView('list')}>
              List
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {cards.length === 0 ? (
            <p>Aucun objet dans votre collection.</p>
          ) : (
            cards.map(card => (
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
                  quality: card.quality
                }}
                view={view}
                onDelete={handleDeleteCard}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
