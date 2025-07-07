import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
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
    image_url: '',
  });

  const { rarities, fetchRarities } = useRarityStore();
  const { items, fetchitem } = useItemStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cardSuggestions, setCardSuggestions] = useState([]);

  useEffect(() => {
    fetchRarities();
    fetchitem();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedFilePreview(null);
    }
  }, [selectedFile]);

  const selectedItem = items.find(i => i.id === Number(formData.item_type_id));
  const isCard = selectedItem?.name.toLowerCase() === 'carte';

  const searchCard = debounce(async (query) => {
    if (!query || query.length < 3) return;
    try {
      const res = await fetch(`https://api.tcgdex.net/v2/fr/cards?name=${encodeURIComponent(query)}`);
      const data = await res.json();
      setCardSuggestions(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  }, 500);

  const fetchCardDetails = async (cardId) => {
    const res = await fetch(`https://api.tcgdex.net/v2/fr/cards/${cardId}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (isCard) searchCard(formData.name);
  }, [formData.name, isCard]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectSuggestion = async (card) => {
    const fullCard = await fetchCardDetails(card.id);
    setFormData((prev) => ({
      ...prev,
      name: fullCard.name,
      image_url: `${fullCard.image}/high.png`,
      edition: fullCard.set?.name || "",
    }));
    setCardSuggestions([]);
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('authToken');

    try {
      let formPayload;

      if (selectedFile) {
        formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('edition', formData.edition);
        formPayload.append('item_type_id', formData.item_type_id);
        formPayload.append('rarity_id', formData.rarity_id);
        formPayload.append('quality', formData.quality);
        formPayload.append('purchase_price', formData.purchase_price);
        formPayload.append('estimated_value', formData.estimated_value);
        formPayload.append('image', selectedFile); // fichier image
      } else {
        formPayload = JSON.stringify({
          ...formData,
          item_type_id: Number(formData.item_type_id),
          rarity_id: Number(formData.rarity_id),
          quality: Number(formData.quality),
          purchase_price: parseFloat(formData.purchase_price),
          estimated_value: parseFloat(formData.estimated_value),
          image_url: formData.image_url, // URL image
        });
      }

      const res = await fetch('http://localhost:3000/api/collection/add-item', {
        method: 'POST',
        headers: selectedFile
          ? { Authorization: `Bearer ${token}` }
          : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        body: formPayload,
      });

      if (!res.ok) throw new Error('Erreur lors de l’ajout');

      setMessage('Carte ajoutée avec succès 🎉');
      toast.success(`Carte ajoutée avec succès 🎉`);

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
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.success(`Erreur lors de l'ajout de la carte.`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Ajouter un produit</h1>
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
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              autoComplete="off"
            />
            {isCard && cardSuggestions.length > 0 && (
              <ul className="bg-white border rounded mt-1 max-h-40 overflow-y-auto">
                {cardSuggestions.map(card => (
                  <li
                    key={card.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => handleSelectSuggestion(card)}
                  >
                    <img src={`${card.image}/high.png`} alt={card.name} className="w-8 h-8 object-contain" />
                    <span>{card.name}</span>
                  </li>
                ))}
              </ul>
            )}
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
            <label htmlFor="image_url">Image (URL ou fichier)</label>
            <input
              id="image_url"
              type="url"
              placeholder="Ou collez une URL"
              value={formData.image_url}
              onChange={(e) => {
                handleChange(e);
                setSelectedFile(null); // reset file si on colle une URL
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setFormData((prev) => ({ ...prev, image_url: '' }));
              }}
              className="w-full p-2 border rounded"
            />
            {(formData.image_url || selectedFilePreview) && (
              <img
                src={selectedFilePreview || formData.image_url}
                alt="Aperçu"
                className="w-32 mt-2 rounded border"
              />
            )}
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
