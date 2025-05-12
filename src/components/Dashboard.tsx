import { CreditCardIcon, DollarSignIcon, PercentIcon, TrendingUpIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useCollectionStore } from '../stores/collectionStore';

export const Dashboard = () => {
  
  
  const {
    totalPurchasePrice,
    totalEstimatedValue,
    cardCount,
    fetchCollection,
  } = useCollectionStore()
  
  useEffect(() => {
    fetchCollection()
  }, [])
  
  const profitLossPercent = ((totalEstimatedValue - totalPurchasePrice) / totalPurchasePrice) * 100;

  return <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      Tableau de bord de la collection
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total des items" value={cardCount} icon={<CreditCardIcon className="text-blue-500" />} color="blue" />
      <StatCard title="Dépenses totales" value={`${totalPurchasePrice.toFixed(2)} €`} icon={<DollarSignIcon className="text-red-500" />} color="red" />
      <StatCard title="Valeur du marché" value={`${totalEstimatedValue.toFixed(2)} €`} icon={<TrendingUpIcon className="text-green-500" />} color="green" />
      <StatCard
        title="Profit/Perte"
        value={`${profitLossPercent >= 0 ? '+' : ''}${profitLossPercent.toFixed(1)}%`}
        icon={<PercentIcon className="text-purple-500" />}
        color="purple"
        trend={profitLossPercent >= 0 ? 'up' : 'down'}
      />
    </div>
  </div>;
};
const StatCard = ({
  title,
  value,
  icon,
  color,
  trend
}) => {
  const getBgColor = () => {
    const colors = {
      blue: 'bg-blue-100',
      yellow: 'bg-yellow-100',
      red: 'bg-red-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100'
    };
    return colors[color] || 'bg-gray-100';
  };
  return <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center">
      <div className={`${getBgColor()} p-3 rounded-lg`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className="flex items-center">
          <p className="text-xl font-bold text-gray-800">{value}</p>
          {trend && <span className={`ml-2 text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>}
        </div>
      </div>
    </div>
  </div>;
};