import { useEffect, useState } from 'react';
import { useItemStore } from '../stores/useItemStore';
import { useRarityStore } from '../stores/useRarityStore';

const AjouterProduit = () => {
  const [formData, setFormData] = useState({
    name: '',
    edition: '',
    rarity_id: 1,
    item_type_id: 1,
    quality: 5,
    purchase_price: '',
    estimated_value: '',
    image_url: 'https://images.pokemontcg.io/shf/SV044_hires.png',
  });

  const { rarities, fetchRarities } = useRarityStore();
  const { items, fetchitem } = useItemStore();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRarities();
    fetchitem();
  }, []);

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
      item_type_id: Number(formData.item_type_id),
      rarity_id: Number(formData.rarity_id),
      quality: Number(formData.quality),
      purchase_price: parseFloat(formData.purchase_price),
      estimated_value: parseFloat(formData.estimated_value),
      image_url: formData.image_url,
    };

    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:3000/api/collection/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erreur lors de l’ajout');

      setMessage('Carte ajoutée avec succès 🎉');
      setFormData({
        name: '',
        edition: '',
        rarity_id: 1,
        item_type_id: 1,
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
  const selectedItem = items.find(i => i.id === Number(formData.item_type_id));
  const isCard = selectedItem?.name.toLowerCase() === 'carte'; // ou 'carte' selon ton libellé

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un produit</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="item_type_id">Item</label>
            <select id="item_type_id" value={formData.item_type_id} onChange={handleChange} className="w-full p-2 border rounded">
              {items.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="name">Nom de l'item</label>
            <input id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="edition">Édition</label>
            <input id="edition" value={formData.edition} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          {isCard && (
            <div>
              <label htmlFor="rarity_id">Rareté</label>
              <select id="rarity_id" value={formData.rarity_id} onChange={handleChange} className="w-full p-2 border rounded">
                {rarities.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="quality">Qualité</label>
            <div className='flex space-x-4'>
              <input
                type="range"
                id="quality"
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
      </div>
    </div>
  );
};

export default AjouterProduit;
