import { CreditCardIcon, PackageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRarityStore } from '../stores/useRarityStore';

const FormCarte = () => {
  const [formData, setFormData] = useState({
    name: '',
    edition: '',
    rarity_id: 1,
    quality: 5,
    purchase_price: '',
    estimated_value: '',
    image_url: '',
  });

  const { rarities, fetchRarities } = useRarityStore();

  useEffect(() => {
    fetchRarities();
  }, []);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      name: formData.name,
      edition: formData.edition,
      item_type_id: 1, // 1 = carte
      rarity_id: Number(formData.rarity_id),
      quality: Number(formData.quality),
      purchase_price: parseFloat(formData.purchase_price),
      estimated_value: parseFloat(formData.estimated_value),
      image_url: formData.image_url,
    };
    
    try {
      const token = localStorage.getItem('authToken');
      console.log(token)
      const res = await fetch('http://localhost:3000/api/collection/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erreur lors de l’ajout');

      setMessage('Carte ajoutée avec succès 🎉');
      setFormData({
        name: '',
        edition: '',
        rarity_id: 1,
        quality: 5,
        purchase_price: '',
        estimated_value: '',
        image_url: '',
      });
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'ajout de la carte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom de la carte</label>
        <input id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="edition">Édition</label>
        <input id="edition" value={formData.edition} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="rarity_id">Rareté</label>
        <select id="rarity_id" value={formData.rarity_id} onChange={handleChange} className="w-full p-2 border rounded">
          {rarities.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quality_id">Qualité</label>
        <input
          type="range"
          id="quality_id"
          min="1"
          max="10"
          value={formData.quality}
          onChange={handleChange}
          className="w-full"
        />
        <input
          type="number"
          min="1"
          max="10"
          value={formData.quality}
          onChange={handleChange}
          className="w-16 mt-2 border rounded p-1"
        />
      </div>
      <div>
        <label htmlFor="purchase_price">Prix d'achat (€)</label>
        <input id="purchase_price" type="number" step="0.01" value={formData.purchase_price} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="estimated_value">Valeur estimée (€)</label>
        <input id="estimated_value" type="number" step="0.01" value={formData.estimated_value} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="image_url">Image URL</label>
        <input id="image_url" type="url" value={formData.image_url} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {loading ? 'Envoi...' : 'Ajouter la carte'}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
};


export const AjouterProduit = () => {
  const [activeTab, setActiveTab] = useState('carte');

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un produit</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'carte'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setActiveTab('carte')}
          >
            <CreditCardIcon size={18} className="mr-2" />
            Carte
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'booster'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setActiveTab('booster')}
          >
            <PackageIcon size={18} className="mr-2" />
            Booster
          </button>
        </div>
        {activeTab === 'carte' ? <FormCarte /> : <FormBooster />}
      </div>
    </div>
  );
};
