import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { BarChart } from './BarChart';
import DoughnutChart from './DoughnutChart';

export const Charts = () => {
  const user = useAuthStore((state) => state.user);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], dataValues: [] });
  const token = localStorage.getItem('authToken');
  const userId = user?.id;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/collection/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setCards(data.collection || []);
        console.log('les data', data.collection)
      } catch (err) {
        console.error('Erreur de chargement des cartes :', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDistribution = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/collection/distribution/${userId}`);
        const data = await res.json();

        const labels = data.distribution.map((item) => item.item_types);
        const dataValues = data.distribution.map((item) => item.count);
        setChartData({ labels, dataValues });
      } catch (err) {
        console.error('Erreur de chargement de la distribution :', err);
      }
    };

    if (userId && token) {
      fetchCards();
      fetchDistribution();
    }
  }, [userId, token]);

  // Préparer les données pour le BarChart
  const monthlyData = cards.reduce((acc, card) => {
    const date = new Date(card.created_at);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!acc[month]) {
      acc[month] = { estimated: 0, purchase: 0 };
    }
    acc[month].estimated += parseFloat(card.estimated_value);
    acc[month].purchase += parseFloat(card.purchase_price);
    return acc;
  }, {} as Record<string, { estimated: number; purchase: number }>);

  const barChartData = cards.map((card) => ({
    estimated_value: card.estimated_value,
    purchase_price: card.purchase_price,
    created_at: card.created_at
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Collection</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Évolution des prix par mois
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <BarChart data={barChartData} />
            )}
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Répartition des types
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center p-5">
            <div className="w-full h-full">
              {chartData.labels.length > 0 && (
                <DoughnutChart
                  labels={chartData.labels}
                  dataValues={chartData.dataValues}
                  title=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
